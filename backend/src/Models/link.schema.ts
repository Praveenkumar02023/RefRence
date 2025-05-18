import mongoose from "mongoose";

const linkScehma = new mongoose.Schema({
    hash : {type : String , required :true },
    userId : [{type : mongoose.Types.ObjectId, ref : "User" , required : true}],
    contentId : {type : String , required : true , unique : true}
})

const Link = mongoose.model('Link',linkScehma);

export default Link;