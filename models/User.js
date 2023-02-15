const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String
        },
        birthday: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true
        },
        roles:{ 
            role_name: { type: String, required: true },
        },
        isActive: {
            type: Boolean,
            required: true,
        }
    }
);

module.exports = model('User', UserSchema);