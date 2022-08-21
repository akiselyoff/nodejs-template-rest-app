const { addContact } = require('../../models/contacts');
const { RequestError } = require('../../helpers');
const schemas = require('../../schemas/contacts');

const add = async (req, res, next) => {
  try {
    const { error } = schemas.add.validate(req.body);
    if (error) throw RequestError(400, error.message);
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
