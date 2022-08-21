const express = require('express');
const router = express.Router();
const controllers = require('../../controllers/contacts');
const { controllerWrapper } = require('../../helpers');
const { validationBody } = require('../../middlewares');
const schemas = require('../../schemas/contacts');

router.get('/', controllerWrapper(controllers.getAll));

router.get('/:contactId', controllerWrapper(controllers.getById));

router.post(
  '/',
  validationBody(schemas.add),
  controllerWrapper(controllers.add)
);

router.delete('/:contactId', controllerWrapper(controllers.removeById));

router.put(
  '/:contactId',
  validationBody(schemas.add),
  controllerWrapper(controllers.updateById)
);

module.exports = router;
