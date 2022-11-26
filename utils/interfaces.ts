import { Date, Document } from "mongoose";

export interface user extends Document {
    name: string;
    eMail: string;
    password: string;
    joinDate: Date;
    token: string;
};