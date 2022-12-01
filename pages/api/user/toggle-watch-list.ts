import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../utils/db";
import { ERROR_INVALID_AUTHORIZATION, ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userToggleWatchListResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userToggleWatchListResponse>) {
    if(request.method !== "POST") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token, id } = request.body;
        const user = await users.findOne({ token });
        if(!user) return response.json({ error: true, message: ERROR_INVALID_AUTHORIZATION });
        let status: "added" | "removed";
        if(user.watchList?.includes(id)) {
            user.watchList = user.watchList.filter(movieId => movieId !== id);
            status = "removed";
        } else {
            user.watchList?.push(id);
            status = "added";
        }
        await user.save();
        response.json({ success: true, status });
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};