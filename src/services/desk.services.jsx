import { fetchGet, fetchPost } from '../helpers'

export const deskService = {
    createDesk,
    getCards,
    pinCard,
    deleteCard,
    editDesk
};

function createDesk(params, access_token) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchPost('create-desk', params, headers);
}

function editDesk(params, access_token) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchPost('edit-desk', params, headers);
}

function getCards(param, access_token) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchGet('get-cards', param, headers);
}

function pinCard(params, access_token) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchPost('pin-card', params, headers);
}

function deleteCard(params, access_token) {
    const headers = {'Authorization': `Bearer ${access_token}`};
    return fetchPost('delete-card', params, headers);
}