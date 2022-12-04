import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";
import { users } from "../../../utils/db";
import { ERROR_INVALID_AUTHORIZATION, ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if(request.method !== "GET") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token } = request.query;
        const user = await users.findOne({ token });
        if(!user) return response.json({ error: true, message: ERROR_INVALID_AUTHORIZATION });
        const history = user.historyList || [];
        response.json({ result: await Promise.all(history.sort((a, b) => a.id - b.id).map(async m => new Object({ viewedAt: m.date.toLocaleDateString(), ...await fetcher(`https://api.themoviedb.org/3/movie/${m.id}?api_key=${process.env.TMDB_API_KEY}`, { method: "GET" }) }))) });
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};