export const fetcher = (input: RequestInfo | URL, init: RequestInit) => fetch(input, init).then(res => res.json());
export const buildImageUrl = (path: string, size: string = "original") => `https://image.tmdb.org/t/p/${size}${path}`;
export const timeout = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const createRandomToken = (length: number) => [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join("");