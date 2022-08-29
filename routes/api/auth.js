const express = require('express');
const router = express.Router();
const { controllerWrapper } = require('../../helpers');
const controllers = require('../../controllers/auth');
const { validationBody } = require('../../middlewares');
const { schemas } = require('../../models/user');

router.post(
  '/signup',
  validationBody(schemas.registrationSchema),
  controllerWrapper(controllers.registration)
);

module.exports = router;
