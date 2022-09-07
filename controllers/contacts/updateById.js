const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) throw RequestError(404, 'Not found');
  if (owner.toString() !== contact.owner.toString()) {
    throw RequestError(403, 'Forbidden');
  }
  const updateContact = await Contact.findOneAndUpdate(
    contactId,
    { ...req.body, owner },
    {
      new: true,
    }
  );
  res.status(200).json({ message: 'Contact was updated to:', updateContact });
};

module.exports = updateById;
