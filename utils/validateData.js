const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

//validating user's signup data
const validate = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    role: Joi.string().required().required().label("Role"),
    phone: Joi.number().required().required().label("Phone Number"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = validate;
