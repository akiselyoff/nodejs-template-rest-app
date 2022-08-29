const { Schema, model } = require('mongoose');
const { handleSchemaValidationError } = require('../helpers');
const { mailRegex } = require('../share/variables');
const Joi = require('joi');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      //   match: passwordRegex,
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
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'user',
    // },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleSchemaValidationError);

const User = model('user', userSchema);

const registrationSchema = Joi.object({
  email: Joi.string()
    .regex(mailRegex)
    .message('Wrong format! Should be like a mail schema: example@mail.com')
    .required(),
  password: Joi.string()
    // .regex(passwordRegex)
    .required(),
  // .message(
  //   'Wrong format! Should be minimum eight characters, at least one letter, one number and one special character @$!%*#?&'
  // ),
  repeatPassword: Joi.ref('password'),
});

const schemas = {
  registrationSchema,
};

module.exports = {
  User,
  schemas,
};
