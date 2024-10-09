import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Home Page connection (admininfo)
        const mainConnection = await mongoose.connect(`${process.env.MONGODB_URI}/admininfo?retryWrites=true&w=majority&appName=Cluster0&connectTimeoutMS=30000`);

        // Login connection (logincredentials)
        const loginConnection = await mongoose.createConnection(`${process.env.MONGODB_URI}/logincredentials?retryWrites=true&w=majority&appName=Cluster0&connectTimeoutMS=30000`);

        // Student details connection (logincredentials)
        const studentDetailsConnection = await mongoose.createConnection(`${process.env.MONGODB_URI}/studentdetails?retryWrites=true&w=majority&appName=Cluster0&connectTimeoutMS=30000`);

        return {
            mainConnection,
            loginConnection,
            studentDetailsConnection
        };
    } catch (error) {
        console.error("MONGODB connection FAILED", error);
        process.exit(1); // Exit process with failure
    }finally{
        console.log("MongoDB is connected Succesfully.🐱‍🏍")
    }
};

// Export the function so it can be called elsewhere
export default connectDB;
