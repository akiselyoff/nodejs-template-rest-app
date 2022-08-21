const { listContacts } = require('../../models/contacts');

const getAll = async (req, res) => {
  const data = await listContacts();
  res.status(200).json(data);
};

module.exports = getAll;
