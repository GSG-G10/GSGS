const joi = require("joi");

const loginSchema = joi.object({
  username_login: joi.string().min(3).max(30).required(),
  password_login: joi.string().min(7).max(30).pattern(new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$')).required(),
});


module.exports = loginSchema;