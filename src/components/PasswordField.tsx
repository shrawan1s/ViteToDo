import { useField } from "formik";

export const PasswordField: React.FC<{}> = () => {
    const [field, meta, helpers] = useField('password');

    // Set field as touched only when user starts typing
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value);
        if (!meta.touched) {
            helpers.setTouched(true);
        }
    };

    return (
        <>
            <input
                {...field}
                type="password"
                className="border p-2 w-full rounded-md outline-none"
                placeholder="Enter your password"
                onChange={handleInputChange} // Use handleInputChange for onChange event
            />
            {meta.error && meta.touched ? (
                <div className="h-1">
                    <div className="text-red-500">{meta.error}</div>
                </div>
            ) : (
                <div className="h-1">
                </div>
            )}
        </>
    );
};
