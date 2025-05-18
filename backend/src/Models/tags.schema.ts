import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
    title : {type : String , required : true , unique : true}
})

const Tag = mongoose.model('TAG',tagSchema);

export default Tag;