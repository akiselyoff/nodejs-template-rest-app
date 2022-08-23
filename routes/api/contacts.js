const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validationBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', controllerWrapper(controllers.getAll));

router.get('/:contactId', isValidId, controllerWrapper(controllers.getById));

router.post(
  '/',
  validationBody(schemas.contactAddSchema),
  controllerWrapper(controllers.add)
);

// router.delete('/:contactId', controllerWrapper(controllers.removeById));

router.put(
  '/:contactId',
  // isValidId,
  validationBody(schemas.contactAddSchema),
  controllerWrapper(controllers.updateById)
);

module.exports = router;
