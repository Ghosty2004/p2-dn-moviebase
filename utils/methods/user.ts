import { userLoginResonse, userPasswordChangeResponse, userRegisterResponse, userValidateResponse } from "../types";

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