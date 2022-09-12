const { User } = require('../../models/user');
const { RequestError, sendEmail } = require('../../helpers');

const { sendEmailUseSendgrid } = sendEmail;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw RequestError(404, 'Not found');
  if (user.verify)
    throw RequestError(400, 'Verification has already been passed');
  const mail = {
    to: email,
    subject: 'Re-confirmation registration',
    html: `<a href="http://localhost:3000/api/auth/verify/${user.verificationToken}" target="_blank">Click this link to confirm</a>`,
  };
  await sendEmailUseSendgrid(mail);
  res.json({ message: 'Verification email re-sent' });
};

module.exports = resendVerifyEmail;
