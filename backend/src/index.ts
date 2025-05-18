import express from "express"
import connectDB from "./db/db";
import { signup, login } from "./controllers/User.controller"
import {authJWT} from "./utils/auth.middlewares";
import { deleteContent, getAllContent, uploadContent } from "./controllers/content.controller";
import { generateLink, getContentFromLink } from "./controllers/link.controller";

const app = express()

const PORT = 8000;
app.use(express.json());

app.post("/api/v1/signup",signup);
app.post("/api/v1/login",login);

app.post("/api/v1/content/upload" ,authJWT,uploadContent);
app.get("/api/v1/content/all",authJWT,getAllContent);
app.delete("/api/v1/content/:id",authJWT,deleteContent);

app.post("/api/v1/content/link/:id", authJWT, generateLink);
app.get("/api/v1/content/share/:hash", getContentFromLink);

app.get("/",(req,res)=>{
    res.status(200).json({message : "Homepage"});
})


app.listen(PORT,()=>{
    connectDB();
    console.log("server is running on port : ",PORT);
})
