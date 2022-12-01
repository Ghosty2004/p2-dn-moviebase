import { Schema } from "mongoose";
import { user } from "../../interfaces";

export const userSchema = new Schema<user>({
    name: Schema.Types.String,
    eMail: Schema.Types.String,
    password: Schema.Types.String,
    token: Schema.Types.String,
    joinDate: Schema.Types.Date,
    watchList: [Schema.Types.Number],
    historyList: [{
        id: Schema.Types.Number,
        date: Schema.Types.Date
    }]
});