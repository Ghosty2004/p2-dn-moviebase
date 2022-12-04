import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";
import { users } from "../../../utils/db";
import { ERROR_INVALID_AUTHORIZATION, ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userFetchWatchListResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userFetchWatchListResponse>) {
    if(request.method !== "GET") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token } = request.query;
        const user = await users.findOne({ token });
        if(!user) return response.json({ error: true, message: ERROR_INVALID_AUTHORIZATION });
        const watchList = user.watchList || [];
        response.json({ result: await Promise.all(watchList.map(async m => await fetcher(`https://api.themoviedb.org/3/movie/${m}?api_key=${process.env.TMDB_API_KEY}`, { method: "GET" }))) });
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};