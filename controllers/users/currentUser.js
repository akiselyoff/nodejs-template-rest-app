const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  res.status(201).json({ email, subscription });
};

module.exports = currentUser;
