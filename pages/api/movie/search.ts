import { NextApiRequest, NextApiResponse } from "next";
import { fetcher } from "../../../utils/api";
import { ERROR_METHOD_NOT_ALLOWED, ERROR_UNEXPECTED } from "../../../utils/errors";
import { MovieSearchData } from "../../../utils/types";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if(request.method !== "GET") return response.json({ error: true, message: ERROR_METHOD_NOT_ALLOWED });
    try {
        const { query } = request.query;
        const result: MovieSearchData = await fetcher(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`, { method: "GET" });
        response.json(result);
    } catch(e) {
        console.log(e);
        response.json({ error: true, message: ERROR_UNEXPECTED });
    }
};