import { NextApiRequest, NextApiResponse } from "next";
import md5 from "md5";
import { users } from "../../../utils/db";
import { ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { createRandomToken } from "../../../utils/api";
import { userRegisterResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userRegisterResponse>) {
    if(request.method !== "POST") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        if(typeof(request.body.password) !== "undefined") request.body.password = md5(request.body.password);
        const { name, eMail, password } = request.body;
        if(await(users.exists({ $or: [{ name }, { eMail }] }))) return response.json({ error: true, message: "This user is already registered." });
        const token = createRandomToken(20);
        response.json(await new users({ name, eMail, password, token, joinDate: new Date() }).save());
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};