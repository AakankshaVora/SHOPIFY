import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://meet:meet123@cluster0.g0fbads.mongodb.net/FAQ`)
        console.log(`\n MongoDB connection !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("ERROR: ", error);
        process.exit(1);
    }
}

export default connectDB