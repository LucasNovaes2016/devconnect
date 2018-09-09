const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "O Post deve ter entre 10 e 300 caracteres";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Digite o texto";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
