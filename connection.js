const { json } = require("body-parser");
const mongoose = require("mongoose");

mongoose.set('debug', process.env.DATABASE_DEBUG);

//connect database
class DB{
    static connect(){
        mongoose.connect('mongodb://' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME,(err)=>{
            if(err)
            {
                console.log("Error in Mongo Connnection: "+ JSON.stringify(err,undefined,2));
            }
            console.log("MongoDB connection succeded.");
        });
    }
}

module.exports = DB;