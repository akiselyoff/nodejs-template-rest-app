const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controllers = require('../../controllers/users');
const { validationBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post(
  '/signup',
  validationBody(schemas.registrationSchema),
  controllerWrapper(controllers.registration)
);

// loginSchema a same schema with registrationSchema
router.post(
  '/login',
  validationBody(schemas.loginSchema),
  controllerWrapper(controllers.login)
);

router.get('/logout', authenticate, controllerWrapper(controllers.logout));

router.get(
  '/current',
  authenticate,
  controllerWrapper(controllers.currentUser)
);

module.exports = router;
