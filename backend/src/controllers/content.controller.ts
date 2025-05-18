import Content from "../Models/content.schema";
import { Request ,Response } from "express";
import Link from "../Models/link.schema";

interface uploadContentBody{
    type : string,
    link : string,
    title : string,
    tags : string[],
    userId : string
}



export const uploadContent = async (req : Request<{},{},uploadContentBody> , res : Response) =>{

    const {type , link , title , tags} = req.body;
   

    if(!type || !link || !title){

        res.status(400).json({message : `Inavlid document info :(`});
        return;
    }

    console.log(req.userId)
    
    try {
        
        const newContent = new Content({
            type,
            link,
            title,
            tags,
            userId : req.userId?.toString()
        });
        
   
    await newContent.save();

    
     res.status(200).json({
        message: "Content uploaded successfully",
        content: newContent,
       
    });

   } catch (error) {    
        console.log("error occured while uploading content ",error);
        res.status(500).json({message : "Internal server error"});
        return;
   }

}

export const getAllContent = async (req : Request , res : Response)=>{

    try {
        
        const allContent = await Content.find({userId : req.userId});
         res.status(200).json(allContent);
         return;

    } catch (error) {
        console.log("error fetching documents ", error);
        res.status(500).json({message : "Internal server error"});

    }

}


export const deleteContent = async (req:Request , res:Response)=>{

    const { id } = req.params;

    const userId = req.userId

    if(!id){
         res.status(401).json({message : "Content ID not found"});
         return;
    }

    try {

        const content = await Content.findById(id);

        if(!content){
             res.status(404).json({message : "Content not found"});
            return
        }
        
        if(content.userId?.toString() !== userId){
             res.status(401).json({message : "Unauthorized"});
            return
        }

        const deleted  = await Content.findByIdAndDelete(id);
        if(!deleted){
            res.status(400).json({message : "Content not found"});
            return
        }
        await Link.findOneAndDelete({contentId : id});
        
         res.status(200).json({message : "Content deleted successfully"});

    } catch (error) {
        console.log("Error deleting content ",error);
         res.status(500).json({message : "Internal server error"});
    }

}
