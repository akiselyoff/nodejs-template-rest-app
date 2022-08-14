const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { RequestError } = require('../../helpers');

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

const contactsSchema = Joi.object({
  name: Joi.string().min(2).alphanum().required(),
  phone: Joi.string()
    .regex(/^\+[0-9]{3}\s\((\d+)\)-\d{3}-\d{2}-\d{2}/, 'numbers')
    .message('Example phone number schema: +380 (67)-111-22-33')
    .required(),
  email: Joi.string().email().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    // if (!contact) res.status(404).json({ message: 'Not found' });
    if (!contact) throw RequestError(404, 'Not found');
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) res.status(400).json({ message: error.message });
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    console.log(contact);
    if (!contact) res.status(404).json({ message: 'not found' });
    res.status(200).json({ message: 'Contact was removed', contact }); // status 200 - because 204 do not return a message
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;
    console.log(body);
    if (!body) {
      res.status(400).json({ message: 'missing fields' });
      return;
    }
    const contact = await updateContact(contactId, body);
    if (!contact) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.status(200).json({ message: 'Contact was updated to:', contact });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
