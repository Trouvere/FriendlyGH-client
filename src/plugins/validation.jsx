import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Enter your password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Password's not match")
    .required('Please repeat password')
});

export const signUpSchemaLogin = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Enter your email'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(25, 'Too Long!')
    .required('Enter your password')
});
export const inputForFromikValidation = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('is required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(20, 'Too Long!')
    .required('is required'),
  tel: Yup.string().min(7, 'Too Short!').max(15, 'Too Long!'),
  telegram: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!'),
  skype: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!'),
  linkedIn: Yup.string().min(5, 'Too Short!').max(50, 'Too Long!'),
  about: Yup.string().min(5, 'Too Short!').max(300, 'Too Long!')
});
export default signUpSchema;
