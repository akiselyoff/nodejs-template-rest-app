const { Contact } = require('../../models/contact');

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const data = await Contact.find({ owner }, '-createdAt -updatedAt').populate(
    'owner',
    'email'
  );
  res.status(200).json(data);
};

module.exports = getAll;
