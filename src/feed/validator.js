const { check, body, validationResult } = require('express-validator');

class Validator {

    /**
     * @description Function to validate request body for errors
     * @param {object} req
     * @param {object} res
     * @param {callback} next
     */
    validateHandler(req, res, next) {
        try{
            let errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({errors: errors.array()});
            next();
        } catch(err){
            return res.status(500).json({error:"Something went wrong" });
        }
    }

    /**
     * @description Function to return validation condition on searching feed
     * @returns {array}
     */
    get getFeed() {
        try {
            return [
                check('search_string', 'search_string is required.').not().isEmpty()
            ];    
        } catch (error) {
            console.log("error:",err);
        }
    }
}

module.exports = Validator;