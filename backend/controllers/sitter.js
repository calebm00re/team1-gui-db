const sitterModel = require('../models/sitter');

const doesSitterExist = async (email) => {
 const users = await sitterModel.find({email : email });
 return users.length === 1;
}

module.exports = {
    doesSitterExist
}