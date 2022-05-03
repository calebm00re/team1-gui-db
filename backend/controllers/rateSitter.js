const rateSitterModel = require('../models/rateSitter');
const sitterController = require('../controllers/sitter');

const createPost = async (parentID, sitterID, rating, comment) => {
    //first we check that all required fields are filled
    if(sitterID == null || parentID == null || rating == null || comment == null){
        return {
            error: "Missing required fields"
        }
    }
    //next, we check that parentID is valid (sitterID is validated by authentication)
    const sitter = await sitterController.getSitters(null,null,null,sitterID, null,null,null);
    if(sitter.length == 0){
        return {
            error: "sitter ID is invalid"
        }
    }
    //next, we put all of the data into the database
    result = await rateSitterModel.createNewRating(parentID, sitterID, rating, comment);
    result.error = "";
    return result;
}


const getPosts = async (parentID, sitterID, rating, date, postID) => {
    //first we are going to generate a filter for the exact matches
    const filter = await makeFilter(parentID, sitterID, rating, postID);
    //second, we'll pass the values
    const result = await rateSitterModel.getPosts(filter, date);
    return result;
}

const makeFilter = async (parentID, sitterID, rating, postID) => {
    let filter = {};
    if(parentID != null){
        filter.parent_id = parentID;
    }
    if(sitterID != null){
        filter.sitter_id = sitterID;
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