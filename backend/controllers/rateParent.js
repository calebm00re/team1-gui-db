const  rateParentModels = require('../models/rateParent');
const userController = require('../controllers/users');

const createPost = async (sitterID, parentID, rating, comment) => {
    //first we check that all required fields are filled
    if(sitterID == null || parentID == null || rating == null || comment == null){
        return {
            error: "Missing required fields"
        }
    }
    //next, we check that parentID is valid (sitterID is validated by authentication)
    console.log("We got here");
    const parent = await userController.getUsers(null,null,null,parentID, null, null, null, null, null, null);
    console.log("and we made it here");
    if(parent.length == 0){
        return {
            error: "Parent ID is invalid"
        }
    }
    //next, we put all of the data into the database
    result = await rateParentModels.createNewRating(sitterID, parentID, rating, comment);
    result.error = "";
    return result;
}

module.exports = {
    createPost
};