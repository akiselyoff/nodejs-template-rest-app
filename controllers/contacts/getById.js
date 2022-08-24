const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const contact = await Contact.findOne({ _id: contactId });// finding something one but id
  const contact = await Contact.findById(contactId); // special method for finding id
  if (!contact) throw RequestError(404, 'Not found');
  res.status(200).json(contact);
};

module.exports = getById;
