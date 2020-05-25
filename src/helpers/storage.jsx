const storage = {
    get,
    set,
    remove,
    clear
};

function get(field) {
    const data = JSON.parse(localStorage.getItem(field));
    return data;
}

function set(field, value) {
    localStorage.setItem(field, JSON.stringify(value));
}

function remove(field) {
    localStorage.removeItem(field);
}

function clear() {
    localStorage.clear();
}

export {storage};