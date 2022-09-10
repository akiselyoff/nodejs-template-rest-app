const { Schema, model } = require('mongoose');
const { handleSchemaValidationError } = require('../helpers');
const { mailRegex, passwordRegex } = require('../share/variables');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: passwordRegex,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      match: mailRegex,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSchemaValidationError);

const User = model('user', userSchema);

const registrationSchema = Joi.object({
  email: Joi.string()
    .pattern(mailRegex)
    .message('Wrong format! Should be like a mail schema: example@mail.com')
    .required(),
  password: Joi.string()
    .pattern(passwordRegex)
    .message(
      'Wrong format! Should be minimum eight characters, at least one letter, one number and one special character @$!%*#?&'
    )
    .required(),
  subscription: Joi.string().valid('starter', 'pro', 'business'),
  token: {
    type: String,
    default: null,
  },
});

const schemas = {
  registrationSchema,
  loginSchema: registrationSchema,
};

module.exports = {
  User,
  schemas,
};
