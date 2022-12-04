import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../utils/db";
import { ERROR_INVALID_AUTHORIZATION, ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userRemoveWatchListResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, repsonse: NextApiResponse<userRemoveWatchListResponse>) {
    if(request.method !== "POST") return repsonse.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token, id } = request.body;
        const user = await users.findOne({ token });
        if(!user) return repsonse.json({ error: true, message: ERROR_INVALID_AUTHORIZATION });
        if(!user.watchList?.some(m => m === id)) return repsonse.json({ error: true, message: "Movie not found in watchlist" });
        user.watchList = user.watchList.filter(m => m !== id);
        await user.save();
        repsonse.json({ error: false, message: "Movie removed from watchlist" });
    } catch(e) {
        console.log(e);
        repsonse.json({ error: true, message: ERROR_UNEXPECTED });
    }
};