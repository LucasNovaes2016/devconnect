const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 4, max: 20 })) {
    errors.handle = "O handle deve ter entre 4 e 20 caracteres";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Digite o handle";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "Digite o Status";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Digite as habilidades";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "URL inválida";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "URL inválida";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "URL inválida";
    }
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "URL inválida";
    }
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "URL inválida";
    }
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "URL inválida";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
