import openSocket from 'socket.io-client';

const  socket = openSocket('http://localhost:5000');

export {
    subscribeToDesk,
    pinToDesk,
    unsubscribeDesk,
    deleteFromDesk
};

function subscribeToDesk(access_token, desk, PinCardCB, DeleteCardCB) {
    socket.on('pin-card', card => PinCardCB(card));
    socket.on('delete-card', card_id => DeleteCardCB(card_id));
    socket.emit('join-desk', {access_token, desk});
}

function pinToDesk(access_token, desk, card) {
    socket.emit('pin-to-desk', {access_token, desk, card});
}

function deleteFromDesk(access_token, desk, card_id) {
    socket.emit('delete-from-desk', {access_token, desk, card_id});
}

function unsubscribeDesk(desk) {
    socket.emit('leave-desk', {desk});
}


