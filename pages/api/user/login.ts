import { NextApiRequest, NextApiResponse } from "next";
import { users } from "../../../utils/db";
import { ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userLoginResonse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userLoginResonse>) {
    if(request.method !== "POST") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { name, password } = request.body;
        const user = await users.findOne({ name, password });
        if(!user) return response.json({ error: true, message: "Invalid credentials!" });
        const { token } = user;
        response.json({ token });
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};