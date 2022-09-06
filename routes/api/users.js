const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controllers = require('../../controllers/users');
const { authenticate, upload } = require('../../middlewares');

router.get(
  '/current',
  authenticate,
  controllerWrapper(controllers.currentUser)
);

router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(controllers.updateAvatar)
);

module.exports = router;
