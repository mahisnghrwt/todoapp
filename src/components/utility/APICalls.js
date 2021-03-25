const ENDPOINT = "http://localhost:5001/api"
const ENDPOINT_TODO = "http://localhost:5001/api/todo"
const endpoint = {
    USER: "http://localhost:5001/api/user",
    LIST: 'http://localhost:5001/api/list',
    TODO: "http://localhost:5001/api/todo"
}

export const requestUpdateListSortingConfig = async (sort) => {
    const response = await fetch(endpoint.USER, {
        method: 'PUT',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            sort
        })
    })
    return response
}

export const request = async (id) => {
    const remoteURL = ENDPOINT + "/" + id
    console.log(`id: ${remoteURL}`)
    const response = await fetch(ENDPOINT + "/" + id, {
        credentials: 'include'
    })

    return response.json()
}

export const requestAll = async () => {
    const response = await fetch(ENDPOINT, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })

    return response
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
    return response
}

export const requestUpdate = async (id, title) => {
    const response = await fetch(ENDPOINT, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, title}),
        credentials: 'include'
    })
    return response
}

export const requestUpdateSortingConfig = async (id, sort) => {
    const response = await fetch(ENDPOINT, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, sort}),
        credentials: 'include'
    })
    return response
}

export const requestDelete = async (id) => {
    const response = await fetch(ENDPOINT + `/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response
}

// *------------------------------------------------------------------------------*

export const requestTodo = async (id) => {
    const response = await fetch(ENDPOINT_TODO + "/" + id)
    return response.json()
}

export const requestTodoCreate = async (todoListId, todo) => {
    todo.priority = todo.priority.toLowerCase()
    const response = await fetch(ENDPOINT_TODO, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({todoListId, todo})
    })

    return response
}

export const requestTodoUpdate = async (todoListId, todo) => {
    const response = await fetch(ENDPOINT_TODO, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({todoListId, todo}),
        credentials: 'include'
    })
    return response
}

export const requestTodoDelete = async (todoListId, todoId) => {
    const response = await fetch("http://localhost:5001/api/todo/delete", {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            todoListId, todoId
        })
    })
    return response
}