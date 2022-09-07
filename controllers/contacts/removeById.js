const { Contact } = require('../../models/contact');
const { RequestError } = require('../../helpers');

const removeById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) throw RequestError(404, 'Not found');
  if (owner.toString() !== contact.owner.toString()) {
    throw RequestError(403, 'Forbidden');
  }
  await Contact.findByIdAndRemove(contactId);
  res.status(200).json({ message: 'Contact was removed', contact }); // status 200 - because 204 do not return a message
};

module.exports = removeById;
