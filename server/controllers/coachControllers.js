const { generalErrorHandler } = require("../errorhandlers/authErrorHandlers");
const { User } = require("../models")

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