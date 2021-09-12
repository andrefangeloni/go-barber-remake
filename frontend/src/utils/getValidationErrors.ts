import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

const getValidationErrors = (err: ValidationError): Errors => {
console.log("🚀 ~ file: getValidationErrors.ts ~ line 8 ~ getValidationErrors ~ err", err.inner)
  const validationErrors: Errors = {};

  err.inner.forEach((error) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

export default getValidationErrors;
