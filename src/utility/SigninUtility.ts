// Define TypeScript types for form values
export type SigninFormValues = {
    email: string;
    password: string;
};

// Initial values for the form
export const initialValues: SigninFormValues = {
    email: '',
    password: '',
};
