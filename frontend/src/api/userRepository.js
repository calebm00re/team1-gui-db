import axios from "axios";
import { URL } from '../utils/utils'

export class UserRepository {

    login(email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/session/login", {email: email, password: pass})
            .then(function (response) {
                console.log('this is the response: ');
                resolve(response);
            })
            .catch(function (error) {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(function () {
                console.log('im in this bitch');
            });
    }
                           
    register(firstname, lastname, email, pass) {
        return new Promise((resolve, reject) => {
            axios.post(URL + "/users/register", {firstName: firstname, lastName: lastname, email: email, password: pass})
            .then(function (response) {
                console.log('this is the response: ');
                resolve(response);
            })
            .catch(function (error) {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(function () {
                console.log('im in this bitch');
            });
        }
    )}

    getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            axios.get(URL + "/users/email/" + email)
            .then(function (response) {
                console.log('this is the response: ');
                resolve(response);
            })
            .catch(function (error) {
                console.log('this is the error: ');
                console.log(error);
                reject(error);
            })
            .finally(function () {
                console.log('im in this bitch');
            });
        }
    )}
}