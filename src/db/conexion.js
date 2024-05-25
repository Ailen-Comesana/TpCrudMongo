import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGOURI= process.env.MONGODB_URI;

export const connectDB= async () => {
    try {
        await mongoose.connect(MONGOURI);
        console.log("Base de datos conectada");
    } catch (error) {
    console.error("Error al conectar la base de datos:", error);
    process.exit (1);
    }
};