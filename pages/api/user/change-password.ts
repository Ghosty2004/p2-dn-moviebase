import { NextApiRequest, NextApiResponse } from "next";
import { createRandomToken } from "../../../utils/api";
import { users } from "../../../utils/db";
import { ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userPasswordChangeResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userPasswordChangeResponse>) {
    if(request.method !== "POST") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token, oldPassword, newPassword, newPasswordAgain } = request.body;
        if(newPasswordAgain !== newPassword) return response.json({ error: true, message: "Passwords do not match." });
        const user = await users.findOneAndUpdate({ token, password: oldPassword }, { $set: { password: newPassword, token: createRandomToken(20) } });
        if(!user) return response.json({ error: true, message: "Invalid old password." });
        response.json({ success: true, newToken: user.token });
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};