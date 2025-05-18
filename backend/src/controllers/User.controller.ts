import User from "../Models/user.schema";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req : any,res : any)=>{

    const username : string = req.body.username
    const password : string = req.body.password

    if(!username || !password || username.length < 3 || username.length > 10 || password.length < 8 || password.length > 20){

         res.status(411).json("Invalid Username or Password :( " );
         return

    }

    const existingUser = await User.findOne({username});

    if(existingUser){
        res.status(409).json({message : "User already Exist !!"});
        return
    }

    try {

        //hash the password
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new User({username,password: hashedPassword});

    await newUser.save();

    res.status(201).json({message : "Sign up  successfull :)",newUser})

        
    } catch (error) {
        
        console.log("error occured : ",error);
        res.status(400).json({message : "Internal Server Error"});

    }
}


export const login = async (req : any , res:any) =>{

    const username : string = req.body.username;
    const password : string = req.body.password;

    if(!username || !password){

         res.status(403).json({message : "Invalid Username or password"});
         return

    }

    const existingUser = await User.findOne({username});

    if(!existingUser){
         res.status(403).json({message : "Invalid Username"});
         return
    }

    const isPasswordValid = await bcrypt.compare(password,existingUser.password);

    if(!isPasswordValid){
         res.status(403).json({message : "Invalid password :("});
         return
    }

    const token = jwt.sign({
        id :existingUser._id
    },process.env.JWT_SECRET!,
{
    expiresIn : '1h'
});

    //login successfull

     res.status(200).json({message : "Login successfull" , token : token});
}

