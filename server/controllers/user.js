const bcrypt = require("bcrypt");
const Joi = require("joi");
const User = require("../models/user");

const userSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email(),
    mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
    password: Joi.string().required(),
    repeatPassword: Joi.string().required().valid(Joi.ref("password")),
    roles:Joi.array()
});

async function insert(user) {
    user = await Joi.validate(user, userSchema, { abortEarly: false });
    user.hashedPassword = bcrypt.hashSync(user.password, 10);
    delete user.password;
    return await User.createUser(new User(user));
}

module.exports = {
    insert
};