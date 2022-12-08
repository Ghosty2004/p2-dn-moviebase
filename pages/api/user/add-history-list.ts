import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../utils/db";
import { ERROR_INVALID_AUTHORIZATION, ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userAddHistoryListResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userAddHistoryListResponse>) {
    if(request.method !== "POST") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token, id } = request.body;
        const user = await users.findOne({ token });
        if(!user) return response.json({ error: true, message: ERROR_INVALID_AUTHORIZATION });
        if(user.historyList?.some(s => s.id === id)) return response.json({ error: true, message: "This movie is already in your history list." });
        user.historyList?.filter((_, i) => i < 9).push({ id, date: new Date() });
        await user.save();
        response.json({ success: true });
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};