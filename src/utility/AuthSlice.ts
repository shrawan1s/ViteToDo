import { UserDocument } from "./UserAuth";

export type AuthState = {
    user: UserDocument | null;
    message: string | null;
    isLoggedIn: boolean;
    token: string | null;
    error: string | null;
    success: boolean;
};

export type ResetPasswordParams = {
    resetToken: string;
    newPassword: string;
};

export const initialState: AuthState = {
    user: null,
    message: null,
    isLoggedIn: false,
    token: null,
    error: null,
    success: false
};

// Utility function to reset state values
export const resetState = (state: AuthState) => {
    state.error = null;
    state.message = null;
    state.success = false;
};
