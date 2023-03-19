const { User } = require('../models');
const { verify } = require('jsonwebtoken');
const { genSalt, hash, compare } = require('bcrypt');
const {
    createToken,
    userValidator,
    setCookie,
    messages: { userNotFound, invalidToken, accountCreated, incorrectPassword, sessionExpired }
} = require('../helpers');
const {
    signupErrorHandler,
    generalErrorHandler,
} = require('../errorhandlers/authErrorHandlers');

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
