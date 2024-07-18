export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
};

export const isToken = (): string | null => {
    const token = localStorage.getItem('authToken');
    return token;
};
