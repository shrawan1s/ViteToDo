// authUtils.ts (TypeScript)
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
};
