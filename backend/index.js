import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';
import userRoute from "./routes/user.route.js";

const app = express()
dotenv.config()


const port = process.env.PORT;
const MONGO_URL = process.env.MONGO_URI;
//middleware
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:"/tmp",
}))


//DB code:
try {
  mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log(error);
}
//defining routers
app.use("/api/users", userRoute);

//cloudinary 
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY,// Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});