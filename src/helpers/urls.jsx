const domain = 'http://127.0.0.1:5000';

export const api = {
    'login': `${domain}/login`,
    'logout-access': `${domain}/logout/access`,
    'logout-refresh': `${domain}/logout/refresh`,
    'register': `${domain}/registration`,
    'tokenRefresh': `${domain}/token/refresh`,
    'confirmEmail': `${domain}/confirm_email`,

    'get-cards': `${domain}/desk`,
    'pin-card': `${domain}/pin-card`,
    'delete-card': `${domain}/delete-card`,
    'create-desk': `${domain}/create-desk`,
    'edit-desk': `${domain}/edit-desk`,

    'get-current-user': `${domain}/current-user`,
    'get-user': `${domain}/user`,
};
