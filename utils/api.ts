export const fetcher = (input: RequestInfo | URL, init: RequestInit = { method: "GET" }) => fetch(input, init).then(res => res.json());
export const buildImageUrl = (path: string, size: string = "original") => `https://image.tmdb.org/t/p/${size}${path}`;
export const buildFlagImageUrl = (iso_639_1: string) => `https://www.unknown.nu/flags/images/${iso_639_1}-100`;
export const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const createRandomToken = (length: number) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");