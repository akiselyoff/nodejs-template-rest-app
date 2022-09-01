const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const data = await Contact.find({ owner }, '-createdAt -updatedAt', {
    skip,
    limit: Number(limit),
  }).populate('owner', 'email');
  res.status(200).json(data);
};

module.exports = getAll;
