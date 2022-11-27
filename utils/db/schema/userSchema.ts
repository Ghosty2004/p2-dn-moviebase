import { Schema } from "mongoose";
import { user } from "../../interfaces";

export const userSchema = new Schema<user>({
    name: Schema.Types.String,
    eMail: Schema.Types.String,
    password: Schema.Types.String,
    joinDate: Schema.Types.Date,
    token: Schema.Types.String,
    watchList: [Schema.Types.Number],
    historyList: [Schema.Types.Number]
});