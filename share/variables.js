const phoneRegex = /^\(0\d{2}\)\s\d{3}-\d{2}-\d{2}$/;
const mailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const fileMaxSize = 2048;

module.exports = {
  phoneRegex,
  mailRegex,
  passwordRegex,
  fileMaxSize,
};
