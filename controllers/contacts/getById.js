const { getContactById } = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  // if (!contact) res.status(404).json({ message: 'Not found' });
  if (!contact) throw RequestError(404, 'Not found');
  res.status(200).json(contact);
};

module.exports = getById;
