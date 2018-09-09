const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 4, max: 50 })) {
    errors.name = "O nome deve conter entre 4 e 50 caracteres";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Digite o seu nome";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Digite o seu email";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Endereço de Email inválido";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Digite uma senha";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "A senha deve conter no mínimo 6 caracteres";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirme sua senha";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "As senhas devem ser as mesmas";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
