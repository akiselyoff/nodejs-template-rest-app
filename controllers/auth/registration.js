const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw RequestError(409, 'Email already exist');
  const hashPassword = await bcrypt.hash(password, 10); // 10 it`s salt for password
  const avatarURL = gravatar.url(email);
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarURL,
  });
};

module.exports = registration;
