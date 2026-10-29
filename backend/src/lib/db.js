import mongoose from 'mongoose';
import dns from "node:dns";
import {ENV} from "./env.js";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

export const connectDB = async () => {
    try {
        if (!ENV.DB_URL) {
            throw new Error("DB_URL is not defined in environment variables");
        }
        const connectedDB = await mongoose.connect(ENV.DB_URL)
        console.log("✅ Connected to MongoDB : ", connectedDB.connection.host);
    } catch (error) {
        console.log("❌ Error connecting to MongoDB : ", error);
        process.exit(1); // 0 means success, 1 means failure
    }
}