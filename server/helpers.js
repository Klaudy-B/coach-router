const { sign } = require('jsonwebtoken');
const { default: isEmail } = require('validator/lib/isEmail');

const cookiesMaxAge = 365*24*60*60*1000;
module.exports.setCookie = (res, key, value, maxAge)=>{
    if(maxAge === 'session'){
        res.cookie(key, value, {httpOnly: true, sameSite: 'strict'});
        return;
    }else if(maxAge===undefined){
        res.cookie(key, value, {httpOnly: true, maxAge: cookiesMaxAge, sameSite: 'strict'});
        return;
    }else{
        res.cookie(key, value, {httpOnly: true, maxAge , sameSite: 'strict'});
        return;
    }
}
module.exports.messages = {
    userNotFound: (username)=>{
        return `There is no user named ${username}.`;
    },
    usernameTaken: (username)=>{
        return `The username ${username} is already taken.`;
    },
    verificationEmailHTML: (code)=>{
        return `<b>${code}</b> is your ${process.env.APP_NAME} verification code. It will expire in 10 minutes.`;
    },
    noBio: 'You did not provide any bio.',
    provideNewSubject: 'You need to provide a new subject name if you want to update it.',
    subjectChanged: 'Your subject has been updated successfully.',
    provideNewUsername: 'You need to provide a new username if you want to change it.',
    verificationEmailMessageTitle: 'Your verification code',
    noRecoveryCode: "You don't have a verification code.",
    codeExpired: 'Code expired.',
    codeDoesntMatch: 'The code does not match.',
    noEmailCode: "You don't have a verification code.",
    emailVerified: 'Your email is verified.',
    usernameChanged: 'Username changed successfully.',
    passwordChanged: 'Password changed successfully.',
    emailChanged: 'email changed successfully',
    accountDeleted: 'Your account has been deleted successfully.',
    unauthorized: 'Unauthorized',
    provideNewPassword: 'You need to provide a new password.',
    passwordMinLength: 'Password must have at least 8 characters.',
    passwordsDontMatch: "The password confirmation don't match the password you provided.",
    invalidToken: 'Invalid token.',
    accountCreated: 'Your account has been created sucessfully.',
    incorrectPassword: 'Incorrect password.',
    sessionExpired: 'Your session expired.',
    _404message: 'Resources not found.',
    success: 'success',
    unauthorized: 'unauthorized',
    profilePictureSuccess: 'Profile picture uploaded successfully.',
    noUpload: 'No files were uploaded.',
    noSearchPattern: 'You did not type a search pattern.',
    userSchemaProps: ['username', 'name', 'email'],
    userSubjectProps: ['category', 'name'],
}
module.exports.paths = {
    absolute: __dirname,
    profilePictures: '/profile_pictures',
    johnDoe: '/john_doe/johndoe.jpg'
}
module.exports.categories = ['science', 'art', 'coding', 'languages', 'music'];
module.exports.userValidator = (name, username, password1, password2, email)=>{
    let errorFields = {name: '', username: '', password1: '', password2: '', email: ''};
    if(!name){
        errorFields.name = 'The name is required.';
    }
    if(!username){
        errorFields.username = 'The username is required.';
    }
    if(!password1){
        errorFields.password1 = 'The password is required.';
    }
    if(!email){
        errorFields.email = 'The email is required.';
    }
    if(errorFields.username || errorFields.password1 || errorFields.email){
        throw { errorFields };
    }
    const bool = isEmail(email);
    if(!bool){
        errorFields.email = `${email} is not a valide email.`;
    }
    if(password1.length<8){
        errorFields.password1 = 'The password must have at least 8 characters.';
    }
    if(errorFields.password1|| errorFields.email){
        throw { errorFields };
    }
    if(password1 !== password2){
        errorFields.password2 = 'The password confirmation does not match the password you provided.';
    }
    if(errorFields.password2){
        throw { errorFields };
    }
}
module.exports.createToken = (id)=>{
    return sign({ id }, process.env.SECRETSTRING, {expiresIn: cookiesMaxAge/1000});
}
module.exports.cookiesMaxAge = cookiesMaxAge;