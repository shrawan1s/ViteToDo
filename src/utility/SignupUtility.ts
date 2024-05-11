// Define TypeScript types for form values
export type SignupFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

// Initial values for the form
export const initialValues: SignupFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};
