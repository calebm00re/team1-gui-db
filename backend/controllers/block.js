const userController = require('../controllers/users');
const sitterModel = require('../models/sitter');
const userModels = require("../models/users");
const blockModels = require("../models/block");


const blockSitter = async(parentID, sitterID) => {
    try{
        const user = await userModels.find({id: parentID});
        if(user.length === 0){
            return {
                error: "User does not exist"
            };
        }

        const sitter = await sitterModel.find({id: sitterID});
        if(sitter.length === 0){
            return {
                error: "User does not exist"
            };
        }

        result = await blockModels.blockSitter(parentID, sitterID);
        result.error = "";
        return result;
    } catch (error) {
        console.log(error);
    }
}

//this is the controller which does the get functionality. Should take in two paramters, the userID and the sitterID
/*
const blockList = async(userID) => {
    try{
        const result = await userModels.blockList(userID);
        return result;
    } catch (error) {
        console.log(error);
    }
}
*/

//Precondition: parentID and sitterID must be valid
const hasBlocked = async(parentID, sitterID) => {
    try{
        const result = await blockModels.blockList(parentID, sitterID);
        return result.length > 0;
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    blockSitter,
    hasBlocked
}