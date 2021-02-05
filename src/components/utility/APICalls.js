const ENDPOINT = "http://localhost:5001/api"
const ENDPOINT_TODOITEM = "http://localhost:5001/api/todoitem"

export const requestDelete = async (id) => {
    const response = await fetch(ENDPOINT + "/" + id, {
        method: 'DELETE'
    })
    return response.json()
}

export const requestDeleteMany = async (ids) => {
    const response = await fetch(ENDPOINT, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids: ids})
    })
    return response
}

export const requestAll = async () => {
    const response = await fetch(ENDPOINT)
    return response.json()
}

export const requestCreate = async (name) => {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name})
    })
    return response.json()
}

export const requestTodo = async (id) => {
    const response = await fetch(ENDPOINT_TODOITEM + "/" + id)
    return response.json()
}