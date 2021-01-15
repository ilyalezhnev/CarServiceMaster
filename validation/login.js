const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  console.log(data);
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.login)) {
    errors.login = 'Необходимо ввести логин';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Необходимо ввести пароль';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
