const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const {
  validationBody,
  isValidId,
  authenticate,
} = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', authenticate, controllerWrapper(controllers.getAll));

router.get(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWrapper(controllers.getById)
);

router.post(
  '/',
  authenticate,
  validationBody(schemas.contactAddSchema),
  controllerWrapper(controllers.add)
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  controllerWrapper(controllers.removeById)
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validationBody(schemas.contactAddSchema),
  controllerWrapper(controllers.updateById)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  controllerWrapper(controllers.updateFavorite)
);

module.exports = router;
