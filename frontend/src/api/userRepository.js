import axios from "axios";
import { URL } from '../utils/utils'

export class UserRepository {
//     /**
//    * Attempt to create a new account
//    * @param {string} userName - The email to register with
//    * @param {string} password - The password to register with
//    * @param {string} firstName - The first name of the user
//    * @param {string} lastName - The last name of the user
//    * @returns {Object} - The errors of the register request
//    */
//     async register(firstname, lastname, email, pass) {
//         const errors = { success: false };
//         console.log('about tot try to post1');
//         const { status } = await axios.post(URL + "/users/register", {firstName: firstname, lastName: lastname, email: email, password: pass})
//             .then(function (response) {
//                 console.log('this is the response: ');
//                 errors.success = true;
//                 console.log(response);
//             })
//             .catch(function (error) {
//                 console.log('this is the error: ');
//                 console.log(error);
//             })
//             .finally(function () {
//                 console.log('im in this bitch');
//             });

//         return errors.success;
//     }

//     /**
//    * Attempt to login
//    * @param {string} name - The name to sign in with
//    * @param {string} password - The password to sign in with
//    * @returns {Object} - the errors of the login request
//    */

//     async login(email, pass) {
//         const errors = { success: false };
//         console.log('about tot try to post2');
//         const { status } = await axios.post(URL + "/session/login", {email: email, password: pass});
//         console.log("The status is: " + status);
//         if (status <= 201) {
//         errors.success = true;
//         }

//         return errors;
//     }

    login(email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/login", {email: email, password: pass})
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
            axios.post(URL + "/register", {firstName: firstname, lastName: lastname, email: email, password: pass})
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

    getInfo() {
        return new Promise((resolve, reject) => {
            axios.get(URL + "/users/self", { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
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

    putInfo(firstname, lastname, email, imgurl, password, bio) {
        return new Promise((resolve, reject) => {
            axios.put(URL + "/users/self", {firstName: firstname, lastName: lastname, email: email, imgurl: imgurl, password: password, bio: bio},
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
}