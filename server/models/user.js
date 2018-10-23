const mongoose = require("mongoose");
const constants = require("../config/constants");
const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
        match: constants.EMAIL_REGEX,
    },
    hashedPassword: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    roles: [{
        type: String,
    }]
}, {
    versionKey: false
});

UserSchema.statics = {
    async createUser(newUser){
        const user = await newUser.save();
        return user.toObject();
    }
};

module.exports = mongoose.model("User", UserSchema);
