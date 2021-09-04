const Joi = require("joi");

const scheamRegister = Joi.object({
    fname_register: Joi.string().required(),
    username_register: Joi.string().min(3).max(30).required(),
    email_register: Joi.string().email().required(),
    password_register: Joi.string().min(7).max(30).pattern(new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$')).required(),
});

module.exports = scheamRegister;