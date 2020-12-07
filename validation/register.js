const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.login = !isEmpty(data.login) ? data.login : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.login, { min: 2, max: 30 })) {
    errors.login = 'Имя должно содержать от 2 до 30 знаков';
  }
  if (Validator.isEmpty(data.login)) {
    errors.login = 'Необходимо ввести имя';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Пароль должен содержать от 6 до 30 знаков';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Необходимо ввести пароль';
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Необходимо подтвердить пароль';
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Пароли должны совпадать';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
