// snackbarSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SnackbarState = {
    open: boolean;
    message: string;
    severity: 'error' | 'success' | 'info' | 'warning';
}

const initialState: SnackbarState = {
    open: false,
    message: '',
    severity: 'error',
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        openSnackbar(state, action: PayloadAction<{ message: string; severity: 'error' | 'success' | 'info' | 'warning' }>) {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        },
        closeSnackbar(state) {
            state.open = false;
            state.message = '';
        },
    },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;

export type RootState = ReturnType<typeof snackbarSlice.reducer>;
