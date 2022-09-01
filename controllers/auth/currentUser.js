const jwt = require('jsonwebtoken');
const { User } = require('../../models/user');
require('dotenv').config();
const { RequestError } = require('../../helpers');

const { SECRET_KEY } = process.env;

const currentUser = async (req, res) => {
  const { authorization = '' } = req.headers;
  const [token] = authorization.split(' ').slice(-1);
  const { id } = jwt.verify(token, SECRET_KEY);
  const user = await User.findById(id);
  if (!user) throw RequestError(401, 'Not authorized');
  const { email, subscription } = user;
  res.status(201).json({ email, subscription });
};

module.exports = currentUser;
