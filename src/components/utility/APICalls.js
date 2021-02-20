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
            'Access-Control-Allow-Origin':'http://localhost:3000/',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ids: ids})
    })
    return response
}

export const requestAll = async () => {
    const response = await fetch(ENDPOINT, {
        credentials: 'include'
    })
    return response.json()
}

export const requestCreate = async (name) => {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: name}),
        credentials: 'include'
    })
    return response.json()
}

export const requestTodo = async (id) => {
    const response = await fetch(ENDPOINT_TODOITEM + "/" + id)
    return response.json()
}

export const requestTodoCreate = async (data) => {
    const response = await fetch(ENDPOINT_TODOITEM, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return response.json()
}