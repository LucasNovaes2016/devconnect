const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Digite o nome do emprego";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Digite o nome da empresa/organização/instituição";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Escolha a data inicial";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
