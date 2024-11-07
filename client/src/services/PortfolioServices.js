const baseURL = 'http://localhost:8080/api/shares/'

export const getHeldShares = () => {
    return fetch(baseURL)
    .then(res => res.json())
}

export const postNewShareAdd = (payload) => {
    return fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
}

export const editCurrentSharesDB = (id, payload) => {
    return fetch(baseURL + id, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json)
}


export const deleteShares = (id) => {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}


