import * as types from "./actionType";
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://gorest.co.in/',
    headers: {'Authorization': 'Bearer cc96e48bc57c4f84a9d02577af4cd854172d5e184d31cf059ba6c26ee25b3cc3'}
});

const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users
});

const userDeleted = () => ({
    type: types.DELETE_USERS 
});

const userAdded = () => ({
    type: types.ADD_USERS 
});

const userUpdated = () => ({
    type: types.UPDATE_USERS 
});

const getUserDetail = (user) => ({
    type: types.GET_DETAIL_USERS, 
    payload: user
});

const getPost = (posts) => ({
    type: types.GET_POSTS, 
    payload: posts
});

const addPost = () => ({
    type: types.ADD_POSTS 
});

const deletePost = () => ({
    type: types.DELETE_POSTS 
});

export const loadUsers = () => {
    return function (dispatch) {
        instance
            .get(`public/v2/users`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUsers(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const deleteUsers = (id) => {
    return function (dispatch) {
        instance
            .delete(`public/v2/users/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userDeleted());
                dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const addUsers = (user) => {
    return function (dispatch) {
        instance
            .post(`/public/v2/users`, user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userAdded());
                // dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const getDetailUsers = (id) => {
    return function (dispatch) {
        instance
            .get(`public/v2/users/${id}`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getUserDetail(resp.data));
            })
            .catch((error) => console.log(error));
    };
};

export const updateUsers = (user, id) => {
    return function (dispatch) {
        instance
            .put(`public/v2/users/${id}`, user)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(userUpdated());
                // dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const getPosts = (id) => {
    return function (dispatch) {
        instance
            .get(`public/v2/users/${id}/posts`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(getPost(resp.data));
                // dispatch(loadUsers());
            })
            .catch((error) => console.log(error));
    };
};

export const addPosts = (id) => {
    return function (dispatch) {
        instance
            .post(`public/v2/users/${id}/posts`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(addPost());
            })
            .catch((error) => console.log(error));
    };
};

export const deletePosts = (id) => {
    return function (dispatch) {
        instance
            .delete(`public/v2/users/${id}/posts`)
            .then((resp) => {
                console.log("resp", resp);
                dispatch(deletePost());
                dispatch(getPosts(id));
            })
            .catch((error) => console.log(error));
    };
};