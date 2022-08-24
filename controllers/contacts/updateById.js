const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!contact) throw RequestError(404, 'Not found');
  res.status(200).json({ message: 'Contact was updated to:', contact });
};

module.exports = updateById;
