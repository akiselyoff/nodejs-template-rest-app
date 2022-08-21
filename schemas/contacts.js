const Joi = require('joi');

const contactAddSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  phone: Joi.string()
    .regex(/^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/, 'numbers')
    .message('Example phone number schema: +380 (67)-111-22-33')
    .required(),
  email: Joi.string().email().required(),
});

module.exports = {
  add: contactAddSchema,
};
