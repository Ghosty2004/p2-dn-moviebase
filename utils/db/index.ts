import { createConnection } from "mongoose";
import { user } from "../interfaces";
import { userSchema } from "./schema";

const mongoURL = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

if(!mongoURL) throw new Error("Please define the MONGO_URL environment variable inside .env.local");
if(!dbName) throw new Error("Please define the DB_NAME environment variable inside .env.local");

const con = createConnection(mongoURL, { dbName });
con.on("connected", () => console.log("MongoDB: Connected"));
con.on("error", () => (console.log("MongoDB: Connection error"), process.exit()));

const users = con.model<user>("users", userSchema);

export { con, users };