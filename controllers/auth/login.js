const bcrypt = require('bcryptjs');
const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw RequestError(401, 'Email or password is wrong');
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw RequestError(401, 'Email or password is wrong');
};

module.exports = login;
