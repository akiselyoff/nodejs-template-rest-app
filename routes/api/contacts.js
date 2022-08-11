const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json(data);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) res.status(404).json({ message: 'not found' });
  res.status(200).json(contact);
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  const newContact = await addContact(body);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  console.log(contact);
  if (!contact) {
    res.status(404).json({ message: 'not found' });
    return;
  }
  res.status(204).json({ message: `Contact was removed`, contact });
});

router.put('/:contactId', async (req, res, next) => {
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
});

module.exports = router;
