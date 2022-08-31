const { Contact } = require('../../models/contact');

const add = async (req, res) => {
  const { _id: owner } = req.user;
  console.log(owner);
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

module.exports = add;
