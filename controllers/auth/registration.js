const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');

const { sendEmailUseGmail } = sendEmail;

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) throw RequestError(409, 'Email already exist');
  const hashPassword = await bcrypt.hash(password, 10); // 10 it`s salt for password
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: 'Confirm registration',
    html: `<a href="http:localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Click this link to confirm</a>`,
  };
  await sendEmailUseGmail(mail);
  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
    avatarURL,
  });
};

module.exports = registration;
