const { model, Schema } = require('mongoose');

module.exports.User = new model('user', Schema(
        {
            name: String,
            username: {type: String, unique: true},
            email: String,
            password: String,
            subjects: {category: String, name: String, price: Number},
        }
    )
)