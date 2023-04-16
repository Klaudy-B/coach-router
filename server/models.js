const { model, Schema } = require('mongoose');

module.exports.User = new model('user', Schema(
        {
            name: String,
            username: {type: String, unique: true},
            email: String,
            password: String,
            subject: {category: String, name: String, price: Number},
            bio: String,
            verified: Boolean,
            emailCode: {value: String, updatedAt: {type: Date, default: ()=> Date.now()}},
            recoveryCode: {value: String, updatedAt: {type: Date, default: ()=> Date.now()}},
            recoveryAuthorized: {value: Boolean, updatedAt: {type: Date, default: ()=> Date.now()}},
        }
    )
)