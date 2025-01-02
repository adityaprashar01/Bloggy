import {User} from "../models/user.model.js";
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs" ;

export const register = async (req,res)=>{
    if(!req.files || Object.keys(req.files).length==0){
        return res.status(400).json({message:"User photo is required."});
    }
    const {photo}=req.files;
    const allowedFormats = ["image/jpeg","image/png","image/webp"]
    if(!allowedFormats.includes(photo.mimetype)){
        return res.status(400).json({message:"Invalid photo format.Only jpg and png is allowed."});
    }
    const{email,name,password,phone,education,role} = req.body;
    if(!email || !name || !password || !phone || !education || !role|| !photo){
        return res.status(400).json({message:"Please fill all the required fields."});
    }
    const user = await User.findOne({email})
    if(user){
        return res
        .status(400)
        .json({message:"User already exists with this email."});

    }
    const cloudinaryResponse = await cloudinary.uploader.upload(
        photo.tempFilePath
    )
    if(!cloudinaryResponse|| cloudinaryResponse.error){
        console.log(cloudinaryResponse.error)
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        name,
        password:hashedPassword,
        phone,
        education,
        role,
        photo:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.url,
    }});
    await newUser.save()
    if(newUser){
        res.status(201).json({message: "User registered Successfully"});
    }
    
    // console.log("Hello, I m register method...!")
    // console.log(req.body);
    // res.status(200).send("Registration successful!");

};