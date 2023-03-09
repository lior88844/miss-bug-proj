import { storageService } from './async-storage.service.js'

const USER_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


export const userService = {
    getLoggedInUser,
    query,
    remove,
    login,
    logout,
    signup,
    get
}


function getLoggedInUser() {
    const str = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER)
    return JSON.parse(str)
}

function query() {
    return axios.get(`/api/user`)
        .then(res => res.data)
}

function remove(userId) {
    return axios.delete(`/api/user/${userId}`)
        .then(res => res.data)
}

function login(credentials) {
    return axios.post('/api/auth/login', credentials)
        .then(res => res.data)
        .then(user => {
            console.log(user);
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
}

function signup(credentials) {
    return axios.post('/api/auth/signup', credentials)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        })
}

function get(userId) {
    return axios.get(`/api/user/${userId}`).then(res => res.data)
}

