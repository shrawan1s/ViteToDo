import { useState } from 'react';
import { useField } from 'formik';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export const PasswordField: React.FC<{}> = () => {
    const [field, meta, helpers] = useField('password');
    const [showPassword, setShowPassword] = useState(false);

    // Set field as touched only when the user starts typing
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        helpers.setValue(event.target.value);
        if (!meta.touched) {
            helpers.setTouched(true);
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="relative w-full">
            <input
                {...field}
                type={showPassword ? 'text' : 'password'} // Toggle between password and text types
                className="border p-2 w-full rounded-md outline-none"
                placeholder="Enter your password"
                onChange={handleInputChange}
                autoComplete="password"
            />
            {/* Icon for toggling password visibility */}
            <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
            >
                {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
            </div>
            {meta.error && meta.touched ? (
                <div className="h-1">
                    <div className="text-red-500">{meta.error}</div>
                </div>
            ) : (
                <div className="h-1"></div>
            )}
        </div>
    );
};
