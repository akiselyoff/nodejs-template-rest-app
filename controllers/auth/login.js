const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw RequestError(401, 'Email not found');
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw RequestError(401, 'Password wrong');
  if (!user.verify) throw RequestError(403, 'Email not verify');
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
