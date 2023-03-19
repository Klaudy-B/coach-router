const { generalErrorHandler } = require('./errorhandlers/authErrorHandlers');
const { setCookie } = require('./helpers');
const { User } = require('./models');
const { verify } = require('jsonwebtoken');

const verifyUser = async (req, res, next)=>{
    try{
        if(!req.cookies || !req.cookies[process.env.APP_NAME]){
            return res.status(401).json({notLoggedIn: true});
        }
        const decodedToken = verify(req.cookies[process.env.APP_NAME], process.env.SECRETSTRING, (error, decodedToken)=>{
                if(error){
                    setCookie(res, process.env.APP_NAME, '', 1);
                    return res.status(401).json({notLoggedIn: true});
                }
                return decodedToken;
            }
        )
        const user = await User.findOne({_id: decodedToken.id}).select('name username');
        if(!user){
            setCookie(res, process.env.APP_NAME, '', 1);
            return res.status(401).json({unauthorized: true});
        }
        setCookie(res, process.env.APP_NAME, req.cookies[process.env.APP_NAME]);
        req.username = user.username;
        next();
    }catch(error){
        generalErrorHandler(error, res);
    }
}

module.exports = { verifyUser };