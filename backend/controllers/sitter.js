const sitterModel = require('../models/sitter');

const isUnique = async (email) => {
 const users = await sitterModel.find({email : email });
 return users.length === 0;
}

module.exports = {
    isUnique
}