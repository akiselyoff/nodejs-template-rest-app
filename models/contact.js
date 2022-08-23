const { Schema, model } = require('mongoose');
const { handleSchemaValidationError } = require('../helpers');
const Joi = require('joi');

const phoneRegex = /^\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
const mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const contactAddSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  phone: Joi.string()
    .regex(phoneRegex)
    .message(
      'Wrong format! Should be like a phone number schema: (067) 995-33-68'
    )
    .required(),
  email: Joi.string()
    .regex(mailRegex)
    .message('Wrong format! Should be like a mail schema: example@mail.com')
    .required(),
});

const updateFavoriteSchema = Joi.object({ favorite: Joi.bool().required() });

const schemas = { contactAddSchema, updateFavoriteSchema };

const contactSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      match: mailRegex,
    },
    phone: {
      type: String,
      match: phoneRegex,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationError);

const Contact = model('contact', contactSchema); // mongoose сам превращает во множ число contact в contacts

module.exports = {
  Contact,
  schemas,
};
