import { api } from './urls';

async function fetchPost(method, params, headers={}) {
    const request = {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            ...headers
        },
    };

    return fetch(api[method], request)
        .then(function(response)  {
            if (!response.ok) throw response.status || 'error';
            return response.json();
        })
        .then(data => {
            return data;
        });
}

async function fetchGet(method, param, headers={}) {
    const request = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json',
            ...headers
        },
    };
    let url = param ? `${api[method]}/${param}` : api[method];

    return fetch(url,request)
        .then(function(response) {
            if (!response.ok) throw response.status || 'error';
            if (response.status === 217) throw response.status;
            return response.json();
        })
        .then(data => {
            return data;
        });
}

export { fetchGet, fetchPost };