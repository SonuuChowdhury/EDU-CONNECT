import mongoose from "mongoose";
import { DB_NAME } from "../../constants.js";
import dotenv from 'dotenv'
dotenv.config()

const uri=`${process.env.MONGODB_URI}/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(uri)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB
