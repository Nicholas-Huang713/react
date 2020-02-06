export const getJwt = () => {
    return localStorage.getItem('token');
}

export const getStorageEmail = () => {
    return localStorage.getItem('email');
}