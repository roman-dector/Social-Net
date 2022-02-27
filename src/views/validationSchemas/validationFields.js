import * as yup from 'yup';

const validate = {
  emailRequired: () => yup.string().email().required(),

  passRequired: length => yup.string().min(parseInt(length)).required(),
};

export { validate };
