const { User } = require("../models")

module.exports.coachController = async (req, res)=>{
    const users = await User.find().select('name username email subject -_id');
    return res.status(200).json(users);
}