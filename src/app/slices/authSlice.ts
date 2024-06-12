import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
    authToken: string | null;
    error: string | null;
}

const initialState: AuthState = {
    authToken: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthToken: (state, action: PayloadAction<string | null>) => {
            state.authToken = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearAuthData: (state) => {
            state.authToken = null;
            state.error = null;
        },
    },
});

export const { setAuthToken, setError, clearError, clearAuthData } = authSlice.actions;

export default authSlice.reducer;
