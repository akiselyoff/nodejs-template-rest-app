const isConflict = ({ name, code }) =>
  name === 'MongoServerError' && code === 11000;

const handleSchemaValidationError = (error, data, next) => {
  error.status = isConflict ? 409 : 400;
  next();
};

module.exports = handleSchemaValidationError;
