import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        // Primary connection (admininfo)
        const mainConnection = await mongoose.connect(`${process.env.MONGODB_URI}/admininfo?retryWrites=true&w=majority&appName=Cluster0`);

        // Secondary connection (logincredentials)
        const loginConnection = await mongoose.createConnection(`${process.env.MONGODB_URI}/logincredentials?retryWrites=true&w=majority&appName=Cluster0`);

        console.log("Connection established for all the databases!")
        // Return both connections for reuse in other files
        return {
            mainConnection,
            loginConnection
        };
    } catch (error) {
        console.error("MONGODB connection FAILED", error);
        process.exit(1); // Exit process with failure
    }
};

// Export the function so it can be called elsewhere
export default connectDB;
