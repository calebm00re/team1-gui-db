import axios from "axios";
import { URL } from '../utils/utils'

export class UserRepository {

    /**
   * Attempt to create a new account
   * @param {string} userName - The email to register with
   * @param {string} password - The password to register with
   * @param {string} firstName - The first name of the user
   * @param {string} lastName - The last name of the user
   * @returns {Object} - The errors of the register request
   */
    async register(firstname, lastname, email, pass) {
        const errors = { success: false };
        console.log('about tot try to post1');
        const { status } = await axios.post(URL + "/api/createUser", {firstName: firstname, lastName: lastname, email: email, password: pass, bio: "This is the start of something new."});

        if (status <= 201) {
        errors.success = true;
        // sessionStorage.setItem(
        //     "user",
        //     JSON.stringify({
        //     firstName: firstname,
        //     lastName: lastname,
        //     // userID : data.data.insertId
        //     })
        // );
        }

        return errors;
    }
}