const { generalErrorHandler } = require("../errorhandlers/authErrorHandlers");
const { User } = require("../models");
const { messages: { noSearchPattern, userSchemaProps, userSubjectProps } } = require('../helpers');

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
            const keyWords = req.params.pattern.split(' ').filter(word=>word.length>0);
            let arrayPattern = [];
            userSchemaProps.forEach(
                (prop)=>{
                    keyWords.forEach(
                        (keyword)=>{
                            const queryObject = {};
                            queryObject[`${prop}`] = new RegExp(keyword, 'i');
                            arrayPattern.push(queryObject);
                        }
                    )
                }
            )
            userSubjectProps.forEach(
                (prop)=>{
                    keyWords.forEach(
                        (keyword)=>{
                            const queryObject = {};
                            queryObject[`${prop}`] = new RegExp(keyword, 'i');
                            arrayPattern.push({subject: queryObject});
                        }
                    )
                }
            )
            keyWords.forEach(
                (keyword)=>{
                    if(parseFloat(keyword)){
                        arrayPattern.push({'subject.price': {$lte: parseFloat(keyword)}});
                    }
                    return;                 
                }
            )
            const users = await User.find({$or: arrayPattern}).select('name username subject -_id');
            return res.status(200).json(users);
        }
        return res.status(400).json({error: noSearchPattern});
    }catch(error){
        generalErrorHandler(error, res);
    }
}