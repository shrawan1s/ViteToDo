import * as Yup from 'yup';

// Define Yup schema for form validation
export const Tasks = Yup.object().shape({
    title: Yup.string().required('Title is required'),
});
