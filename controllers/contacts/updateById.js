const { updateContact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) throw RequestError(404, 'Not found');
  res.status(200).json({ message: 'Contact was updated to:', contact });
};

module.exports = updateById;
