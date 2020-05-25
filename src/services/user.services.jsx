import { fetchGet, fetchPost } from '../helpers'

export const userService = {
    login,
    logout,
    register,
    tokenRefresh,
    confirmEmail,
    getCurrentUser,
    getUser
};

function login(params) {
    return fetchPost('login', params);
}

function logout(refresh_token, access_token) {
    const headersRefresh = {'Authorization': `Bearer ${refresh_token}`};
    const headersAccess = {'Authorization': `Bearer ${access_token}`};
    return Promise.all([fetchPost('logout-refresh', {}, headersRefresh), fetchPost('logout-access', {}, headersAccess)]);
}

function register(params) {
    return fetchPost('register', params);
}

function tokenRefresh(params) {
    const headers = {'Authorization': `Bearer ${params.refresh_token}`};
    return fetchPost('tokenRefresh', params, headers);
}

function confirmEmail(params) {
    return fetchPost('confirmEmail', params);
}

function getCurrentUser(access_token) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchGet('get-current-user', undefined, headers);
}

function getUser(access_token, id) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchGet('get-user', id, headers);
}