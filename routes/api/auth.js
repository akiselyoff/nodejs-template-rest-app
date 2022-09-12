const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controllers = require('../../controllers/auth');
const { validationBody, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post(
  '/signup',
  validationBody(schemas.registrationSchema),
  controllerWrapper(controllers.registration)
);

router.get(
  '/verify/:verificationToken',
  controllerWrapper(controllers.verifyEmail)
);

router.post(
  '/verify',
  validationBody(schemas.verifyEmailSchema),
  controllerWrapper(controllers.resendVerifyEmail)
);

// loginSchema a same schema with registrationSchema
router.post(
  '/login',
  validationBody(schemas.loginSchema),
  controllerWrapper(controllers.login)
);

router.get('/logout', authenticate, controllerWrapper(controllers.logout));

module.exports = router;
