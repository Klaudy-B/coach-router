const { messages: { usernameTaken } } = require('../helpers');

module.exports.generalErrorHandler = (error, response)=>{
    if(error.error){
        return response.status(400).json(error);
    }
    console.log(error);
    return response.status(500).end();
}
module.exports.signupErrorHandler = (error, response, username)=>{
    if(error.code===11000){
        return response.status(400).json({errorFields: {username: usernameTaken(username)} }  );
    }
    if(error.errorFields){
        return response.status(400).json(error);
    }
    if(error.error){
        return response.status(400).json(error);
    }
    console.log(error);
    return response.status(500).end();
}