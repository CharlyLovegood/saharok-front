const CARD_TYPES_TO_COLORS = {
    'POSITIVE': 'accent-1',
    'NEGATIVE': 'accent-2',
    'ACTION': 'accent-3'
};

const DESK_STATES = ['HIDE_CARDS', 'SHOW_CARDS'];

const DESK_STATUSES = {
    HIDE_CARDS: false,
    SHOW_CARDS: true
};

const CARD_TYPES = {
    POSITIVE: 'POSITIVE',
    NEGATIVE: 'NEGATIVE',
    ACTION: 'ACTION'
};

const ERROR_TYPES = {
    UNAUTHORIZED: 401,
    NEED_CONFIRM: 217,
    CONFLICT: 409,
};

const ALERT_TYPES = {
    SUCCESS: 'SUCCESS',
    ERROR: 'ERROR'
};

const ALERT_TYPES_TO_COLORS = {
    SUCCESS: 'status-ok',
    ERROR: 'status-error'
};

const ERROR_MESSAGES = {
    401: 'Wrong credentials',
    217: 'Confirmation letter sent',
    409: 'User with this email already exists',
    200: 'Success'
};

const COLUMNS = {
    'POSITIVE': 'Positive',
    'NEGATIVE': 'Negative',
    'ACTION': 'Actions'
};

export {
    CARD_TYPES,
    CARD_TYPES_TO_COLORS,
    ERROR_TYPES,
    ERROR_MESSAGES,
    ALERT_TYPES,
    ALERT_TYPES_TO_COLORS,
    DESK_STATES,
    COLUMNS,
    DESK_STATUSES
};