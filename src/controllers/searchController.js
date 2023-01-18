const asyncHandler = require("express-async-handler");
const Location = require("../models/locationModel");


// @desc Get search results
// @route GET /api/search
// FOR SEARCH /api/search?description=search - example /api/search?description=cool
// FOR CATEGORY /api/search?category=category - example /api/search?category=nature
// FOR HASHTAG /api/search?hashtag=#hashtag - example /api/search?category=nature

// @acces Public
const textSearch = asyncHandler(async (req, res) => {
    const query = req.query

    if (req.query.description != null){
        // Search function
        let querySearch = req.query.description
        //for now it searches only the description field.
        const searchResult = await Location.find({'description': {'$regex': `.*${querySearch}.*`, '$options': 'i'}});
        res.status(200).json(searchResult);
    } else {
        // category and hashtag filter function
        const filterResult = await Location.find(query)
        res.status(200).json(filterResult)
    }

});


module.exports = {
    textSearch,
};
