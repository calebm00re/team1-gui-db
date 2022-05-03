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


const getPosts = async (sitterID, parentID, rating, date, postID) => {
    //first we are going to generate a filter for the exact matches
    const filter = await makeFilter(sitterID, parentID, rating, postID);
    //second, we'll pass the values
    const result = await rateParentModels.getPosts(filter, date);
    return result;
}

const makeFilter = async (sitterID, parentID, rating, postID) => {
    let filter = {};
    if(sitterID != null){
        filter.sitter_id = sitterID;
    }
    if(parentID != null){
        filter.parent_id = parentID;
    }
    if(rating != null){
        filter.rating = rating;
    }
    if(postID != null){
        filter.id = postID; //postID is primary key
    }
    return filter;
}

module.exports = {
    createPost,
    getPosts
};