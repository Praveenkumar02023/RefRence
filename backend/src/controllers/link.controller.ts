import {Response ,Request} from "express"
import Content from "../Models/content.schema";
import Link from "../Models/link.schema";
import crypto from "crypto";


declare global {
    namespace Express {
        interface Request{
            userId? : string;
        }
    }
}

export const generateLink = async(req: Request , res : Response) => {

    const {id} = req.params;
    const userId = req.userId;



    if(!userId){
         res.status(401).json({message : "Unauthorized"});
         return
    }

    if(!id){
         res.status(400).json({message : "Content ID not found"});
         return
    }

    

    try {
        
        const contentOwner = await Content.findById(id);
        // console.log(contentOwner);
        if(contentOwner === null){
            res.status(404).json({message : "Content not found"});
        }
        if(contentOwner && contentOwner.userId?.toString() !== userId){

             res.status(401).json({message : "Unauthorized Request"});
            return
        }

        const existingLink = await Link.find({contentId : id});

        if(existingLink.length > 0){
            res.status(200).json({message : "Link Already Exist", link : existingLink });
            return
        }

        const hash = crypto.randomBytes(16).toString("hex");
        const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`;
        const shareableLink = `${BASE_URL}/api/v1/content/share/${hash}`;

        const newLink = new Link({
           hash,
            userId,
            contentId:id
        })

        await newLink.save();

         res.status(200).json({message : "Link generated successfully",link : shareableLink});

    } catch (error) {
        console.log("Error generating link " , error);
        res.status(500).json({message : "Internal server error"});
    }
}

export const getContentFromLink = async(req: Request , res : Response)=>{

    const { hash } = req.params;

    if(!hash){
        res.status(404).json({message : "Invalid link"});
        return
    }

    try {
        
        const contentLink = await Link.findOne({ hash });
        
        if(!contentLink){
            res.status(404).json({message : "Content not found"});
            return
        }
       
        const content = await Content.findById(contentLink.contentId);

        if(!content){
             res.status(404).json({message : "Content not found"});
            return
        }

        res.status(200).json({message : "Content fetched " , content : content});

    } catch (error) {
         console.log("Error fetching content using link " , error);
        res.status(500).json({message : "Internal server error"});
    }
}