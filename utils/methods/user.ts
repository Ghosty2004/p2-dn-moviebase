import { userAddHistoryListResponse, userFetchHistoryResponse, userFetchWatchListResponse, userLoginResonse, userPasswordChangeResponse, userRegisterResponse, userRemoveWatchListResponse, userToggleWatchListResponse, userValidateResponse } from "../types";

export function validateUser(token: string): Promise<userValidateResponse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/validate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token }),
        }).then((response) => response.json()));
    });
};

export function loginUser(name: string, password: string): Promise<userLoginResonse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, password }),
        }).then((response) => response.json()))
    });
};

export function registerUser(name: string, eMail: string, password: string): Promise<userRegisterResponse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, eMail, password }),
        }).then((response) => response.json()))
    });
};

export function changeUserPassword(token: string, { oldPassword, newPassword, newPasswordAgain }: { oldPassword: string, newPassword: string, newPasswordAgain: string }): Promise<userPasswordChangeResponse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/change-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, oldPassword, newPassword, newPasswordAgain }),
        }).then((response) => response.json()))
    });
};

export function toggleUserWatchList(token: string, id: number): Promise<userToggleWatchListResponse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/toggle-watch-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, id }),
        }).then((response) => response.json()))
    });
};

export function addUserHistoryList(token: string, id: number): Promise<userAddHistoryListResponse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/add-history-list", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, id }),
        }).then((response) => response.json()))
    });
};

export function fetchUserWatchlist(token: string): Promise<userFetchWatchListResponse> {
    return new Promise((resolve) => {
        resolve(fetch(`/api/user/fetch-watchlist/?token=${token}`).then((response) => response.json()))
    });
};

export function fetchUserHistory(token: string): Promise<userFetchHistoryResponse> {
    return new Promise((resolve) => {
        resolve(fetch(`/api/user/fetch-history/?token=${token}`).then((response) => response.json()))
    });
};

export function userRemoveFromWatchList(token: string, id: number): Promise<userRemoveWatchListResponse> {
    return new Promise((resolve) => {
        resolve(fetch("/api/user/remove-watchlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token, id }),
        }).then((response) => response.json()))
    });
};