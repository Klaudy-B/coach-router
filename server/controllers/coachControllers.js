const { generalErrorHandler } = require("../errorhandlers/authErrorHandlers");
const { User } = require("../models");
const { messages: { noSearchPattern, userSchemaProps } } = require('../helpers');

module.exports.coachController = async (req, res)=>{
    try{
        if(req.params&&req.params.username){
            const user = await User.findOne({username: req.params.username}).select('name username email subject -_id');
            return res.status(200).json(user);
        }
        const users = await User.find().select('name username subject -_id');
        return res.status(200).json(users);
    }catch(error){
        generalErrorHandler(error, res);
    }
}
module.exports.coachSearchController = async(req, res)=>{
    try{
        if(req.params&&req.params.pattern){
            let users = [];
            users = [
                ...await User.find(
                    {
                        name: new RegExp(`${req.params.pattern}`, 'i'),
                    }
                )
                .select('name username email subject -_id'),
                ...users
            ]
            return res.status(200).json(users);
        }
        return res.status(400).json({error: noSearchPattern});
    }catch(error){
        generalErrorHandler(error, res);
    }
}