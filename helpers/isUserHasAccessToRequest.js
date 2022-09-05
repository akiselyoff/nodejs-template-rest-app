const { RequestError } = require('./RequestError');
const { Contact } = require('../models/contact');

const isUserHasAccessToRequest = async (owner, contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return RequestError(404, 'Not found');
  }
  if (owner.toString() !== contact.owner.toString()) {
    return RequestError(403, 'Forbidden');
  }
};

module.exports = isUserHasAccessToRequest;
