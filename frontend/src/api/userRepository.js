import axios from "axios";
import { URL } from '../utils/utils'

export class UserRepository {

    login(email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/users/login", {email: email, password: pass})
            .then(response => {
                console.log('this is the response: ');
                console.log(response);
                // console.log('this is token', response.data.accessToken);
                sessionStorage.setItem('token', response.data.accessToken);
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        })
    }

    register(firstname, lastname, email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/users/register", {firstName: firstname, lastName: lastname, email: email, password: pass})
            .then(response => {
                sessionStorage.setItem('token', response.data.accessToken);
                console.log('this is the response: ');
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        }
    )}

    getInfo() {
        return new Promise((resolve, reject) => {
            axios.get(URL + "/users/self", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                // console.log('this is response: ');
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        }
    )}

    getSitterInfo() {
        return new Promise((resolve, reject) => {
            axios.get(URL + "/sitter/self", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log('this is response for getSitterInfo: ');
                console.log(response);
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error for getSitterInfo: ');
                console.log(error);
                reject(error);
            })
        })
    }

    putInfo(firstname, lastname, imgurl, password, bio, minage, maxage, starttime, endtime, numkids, location, email) {
        return new Promise((resolve, reject) => {
            axios.put(URL + "/users/self", {firstName: firstname, lastName: lastname, email: email, imgurl: imgurl, password: password, bio: bio, minKidAge: minage, maxKidAge: maxage, startWorkTime: starttime, endWorkTime: endtime, numKids: numkids, location: location },
             { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log('this is the response: ');
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        }
    )}

    deleteUser() {
        return new Promise((resolve, reject) => {
            axios.delete(URL + "/users/self", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log('this is the response for delete user in user repo: ');
                console.log(response);
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error for delete user in user repo: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        }
    )}

    getSitters() {
        return new Promise((resolve, reject) => {
            axios.get(URL + "/sitter", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log('this is the response for get/sitters');
                console.log(response);
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error for get/sitters');
                console.log(error);
                reject(error);
            })
        })
    }

    getSittersByDate(day) {
        return new Promise((resolve, reject) => {
            axios.get(URL + "/sitter_schedule/", { params: {date: day}, headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
            .then(response => {
                console.log('this is the response for get/sitters by date');
                console.log(response);
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error for get/sitters by date');
                console.log(error);
                reject(error);
            })
        })
    }

    sitterLogin(email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/sitter/login", {email: email, password: pass})
            .then(response => {
                console.log('this is the response: ');
                console.log(response);
                // console.log('this is token', response.data.accessToken);
                sessionStorage.setItem('token', response.data.accessToken);
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        })
    }

    sitterRegister(firstname, lastname, email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/sitter/register", {firstName: firstname, lastName: lastname, email: email, password: pass})
            .then(response => {
                sessionStorage.setItem('token', response.data.accessToken);
                console.log('this is the response: ');
                resolve(response);
            })
            .catch(error => {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('im in this');
            });
        }
    )}

}