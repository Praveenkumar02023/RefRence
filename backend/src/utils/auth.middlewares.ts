import {Response , Request , NextFunction} from "express"

import jwt from "jsonwebtoken"


export const authJWT = (req : Request , res : Response , next : NextFunction) =>{

    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
         res.status(401).json({message : "No token found"});
         return;
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        if(!decoded){
             res.status(401).json({message : "Unauthorized"});
             return;
        }

        (req as any).userId = (decoded as any).id;

        next();

    } catch (error) {
        console.log("token verification failed ",error);
        res.status(500).json({message : "Internal server error"});
        return;
    }
}

