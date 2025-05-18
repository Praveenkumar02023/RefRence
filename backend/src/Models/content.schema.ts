import mongoose from "mongoose";

const contentTypes = ['image', 'video', 'article', 'audio','Tweet'];

const contentSchema = new mongoose.Schema({
    link : {type : String ,required : true},
    title : {type : String , required : true},
    type : {type : String , enum : contentTypes ,required :true},
    tags : [{type : mongoose.Types.ObjectId, ref : "TAG"}],
    userId : {type : mongoose.Types.ObjectId , ref : "User", required : true}
});

const Content = mongoose.model('Content',contentSchema);

export default Content;