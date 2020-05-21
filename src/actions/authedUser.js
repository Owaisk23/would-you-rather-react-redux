export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const DELETE_AUTHED_USER = 'DELETE_AUTHED_USER'


export function setAuthedUser (id) {
    return {
        type : SET_AUTHED_USER,
        id
    }
}

export function deleteAuthedUser () {
    return {
        type: DELETE_AUTHED_USER,
        id: ''
    }
}