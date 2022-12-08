import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";
import { users } from "../../../utils/db";
import { ERROR_INVALID_AUTHORIZATION, ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { userRecommendationResponse } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse<userRecommendationResponse>) {
    if(request.method !== "GET") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { token } = request.query;
        const user = await users.findOne({ token });
        if(!user) return response.json({ error: true, message: ERROR_INVALID_AUTHORIZATION });
        const watchList = user.watchList || [];
        const historyList = user.historyList || [];
        const list = [...watchList, ...historyList.map(m => m.id)];
        const randomMovieId = list[Math.floor(Math.random() * list.length)];
        response.json(await fetcher(`https://api.themoviedb.org/3/movie/${randomMovieId}/recommendations?api_key=${process.env.TMDB_API_KEY}`))
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};