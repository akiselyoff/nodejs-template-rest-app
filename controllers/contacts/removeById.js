const { removeContact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (!contact) throw RequestError(404, 'Not found');
  res.status(200).json({ message: 'Contact was removed', contact }); // status 200 - because 204 do not return a message
};

module.exports = removeById;
