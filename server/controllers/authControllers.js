const { User } = require('../models');
const { verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
const { default: isEmail } = require('validator/lib/isEmail');
const {
    createToken,
    userValidator,
    setCookie,
    messages: {
        userNotFound,
        invalidToken,
        accountCreated,
        incorrectPassword,
        sessionExpired,
        success,
        profilePictureSuccess,
        noUpload,
        usernameChanged,
        passwordChanged,
        emailChanged,
        accountDeleted,
        unauthorized
    },
    paths: { absolute, profilePictures }
} = require('../helpers');
const {
    signupErrorHandler,
    generalErrorHandler,
} = require('../errorhandlers/authErrorHandlers');
const { renameSync } = require('fs');
const { join } = require('path');

module.exports.checkLoginStateController = async (req, res)=>{
    try{
        if(!req.cookies || !req.cookies[process.env.APP_NAME]){
            return res.status(200).json({});
        }
        const decodedToken = verify(req.cookies[process.env.APP_NAME], process.env.SECRETSTRING, (error, decodedToken)=>{
            if(error){
                setCookie(res, process.env.APP_NAME, '', 1);
                return res.status(400).json({});
            }
            return decodedToken;
        });
        const user = await User.findOne({_id: decodedToken.id}).select('name username');
        if(!user){
            setCookie(res, process.env.APP_NAME, '', 1);
            throw { error: invalidToken};
        }
        setCookie(res, process.env.APP_NAME, req.cookies[process.env.APP_NAME]);
        return res.status(200).json({ user: user.username, name: user.name});
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.signupController = async (req, res)=>{
    const { name, username, password1, password2, email } = req.body;
    try{
        userValidator(name, username, password1, password2, email);
        const salt = await genSalt(10);
        const password = await hash(password1, salt);
        const user = await User.create(
                {
                    name,
                    username,
                    password,
                    email
            }
         );
        const token = createToken(user._id);
        setCookie(res, process.env.APP_NAME, token);
        return res.status(201).json({success: accountCreated});
    }catch(error){
        signupErrorHandler(error, res, username);
    }
}

module.exports.loginController = async (req, res)=>{
    const { username, password } = req.body;
    try{
        if(username){
            const user = await User.findOne({ username });
            if(!user){
                throw {errorFields:{username: userNotFound(username)}};
            }
            const Token = createToken(username);
            setCookie(res, `${process.env.APP_NAME}loginusername`, Token, 'session');
            return res.status(200).json({password: true});
        }
        if(req.cookies&&req.cookies[`${process.env.APP_NAME}loginusername`]){
            const {id: theUsername} = verify(req.cookies[`${process.env.APP_NAME}loginusername`], process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    throw {error: invalidToken, password: true};
                }
                return decodedToken;
            })
            const user = await User.findOne({username: theUsername});
            if(!user){
                throw {error: userNotFound(theUsername), password: true};
            }
            const auth = await compare(password, user.password);
            if(!auth){
                throw {errorFields:{password: incorrectPassword}, password: true};
            }
            const token = createToken(user._id);
            setCookie(res, process.env.APP_NAME, token);
            setCookie(res, `${process.env.APP_NAME}loginusername`, '', 1);
            return res.status(200).json({ user: user.username});
        }else{
            return res.status(401).json({sessionExpired});
        }
    }catch(error){
        signupErrorHandler(error, res);
    }
}

module.exports.logoutController = (req, res)=>{
    try{
        setCookie(res, process.env.APP_NAME, '', 1);
        return res.status(200).end();
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.subjectController = async (req, res)=>{
    try{
        const { category, name, price } = req.body;
        const user = await User.findOne({username: req.username});
        if(!user){
            return {error: invalidToken};
        }
        user.subject = { category, name, price };
        await user.save();
        return res.json({ success });
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.profilePictureController = async (req, res)=>{
    try{
        const pictureName = req.username;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send({ noUpload });
          }
          req.files.picture.mv(absolute+profilePictures+'/'+pictureName, (error)=>{
            if(error){
                throw error;
            }
            return res.status(200).json({success: profilePictureSuccess});
          })
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.changeUsernameController = async (req, res)=>{
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username: req.username});
        const auth = await compare(password, user.password);
        if(!auth){
            throw{errorFields: {password: incorrectPassword}};
        }
        if(!username){
            throw {errorFields: {username: provideNewUsername}};
        }
        const oldUsername = user.username;
        user.username = username;
        await user.save();
        renameSync(join(__dirname, `../profile_pictures/${oldUsername}`), join(__dirname, `../profile_pictures/${username}`));
        return res.status(200).json({success: usernameChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }
}
module.exports.changePasswordController = async (req, res)=>{
    try{
        const { password1, password2, password3 } = req.body;
        const user = await User.findOne({ username: req.username });
        const auth = await compare(password1, user.password);
        if(!auth){
            throw {errorFields: {password1: incorrectPassword} };
        }
        if(!password2){
            throw {errorFields: {password2: provideNewPassword} };
        }
        if(password2.length<4){
            throw { errorFields: {password2: passwordMinLength} };
        }
        if(password3 !== password2){
            throw { errorFields: {password3: passwordsDontMatch} };
        }
        const salt = await genSalt(10);
        user.password = await hash(password2, salt);
        await user.save();
        return res.status(200).json({success: passwordChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }
}
module.exports.changeEmailController = async (req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ username: req.username });
        const auth = await compare(password, user.password);
        if(!auth){
            throw { errorFields: {password: incorrectPassword} };
        }
        const bool = isEmail(email);
        if(!bool){
            throw { errorFields: {email: emailNotValid(email)} };
        }
        if(user.email !== email){
            user.verified = false;
            user.emailCode = {value: ''};
        }
        user.email = email;
        await user.save();
        return res.status(200).json({success: emailChanged});
    }catch(error){
        signupErrorHandler(error, res);
    }
}
module.exports.deleteAccountController = async (req, res)=>{
    try{
         const { password } = req.body;
         const user = await User.findOne({ username: req.username });
         if(!user){
             setCookie(res, process.env.APP_NAME, '', 1);
             return res.status(401).json({error: unauthorized});
         }
         const auth = await compare(password, user.password);
         if(!auth){
             return res.status(401).json({errorFields: {password: incorrectPassword}});
         }
         await User.findOneAndDelete({username: user.username});
         setCookie(res, process.env.APP_NAME, '', 1);
         return res.status(200).json({success: accountDeleted});
    }catch(error){
     generalErrorHandler(error, res);
    }
 }