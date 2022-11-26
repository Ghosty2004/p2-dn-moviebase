import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../utils/db";
import { ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if(request.method !== "POST") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token } = request.body;
        const user = await users.findOne({ token });
        if(!user) return response.json({ error: true, message: "User not found." });
        response.json(user);
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};