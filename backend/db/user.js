const mongoose= require("mongoose");
const userSchema = new mongoose.Schema({
    Assigned:String,
    Status:String,
    Due_date: Date,
    Priority:String,
    Comments:String,


});
const User=mongoose.model('users',userSchema);
module.exports=User;
