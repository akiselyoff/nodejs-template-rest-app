const { updateContact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');
const schemas = require('../../schemas/contacts');

const updateById = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) throw RequestError(400, error.message);
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (!contact) throw RequestError(404, 'Not found');
  res.status(200).json({ message: 'Contact was updated to:', contact });
};

module.exports = updateById;
