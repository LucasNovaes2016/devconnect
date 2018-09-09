const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.school)) {
    errors.school = "Digite a instituição de ensino";
  }

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Digite o diploma";
  }

  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Digite a área de estudo";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Digite a data nicial";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
