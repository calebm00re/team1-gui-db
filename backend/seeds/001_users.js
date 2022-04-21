const {createNewUser} = require("../models/users");

exports.seed = async function(knex) {
    //seeds database with users
    await createNewUser("Ray", "Irani", "Rayaanjirani@gmail.com", "Rayaanirani");
    await createNewUser("Caleb", "Moore", "ctmoore.com", "Calebmoore");
    await createNewUser("John", "Doe", "jdoe@smu.edu", "Johndoe");
};