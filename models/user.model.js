
/** 
 * this is hold schema for the user
 * 
 * It explains the different fields of use and how it will be stored
 * in the mongodb
*/

const mongoose = require('mongoose');



const userSchema = new mongoose.Schema({

    /** 
     * here we create a schema
     * name,userId is a field
     * Every filed have a string (number type)
     * Required , unique is a constraints
     */
    name:{
        type : String,
        required: true
    },
    userId:{
        type : String,
        required : true,
        unique :true
    },
    password : {
        type :String,
        required : true,
        unique : true,
        minlength : 10,
        lowercase : true
    },
    userType : {
        type : String, // admin or normal users
        required : true,
        default:"CUSTOMER",
        enum : ["ADMIN","CUSTOMER"]
    }

} , {timestamps : true});

/**
 * Define the collection name where it will be stored
 */

module.exports = mongoose.model("User", userSchema);
