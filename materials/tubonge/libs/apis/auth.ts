import { API_URL } from "./config";

export const login = async(data: { email: string}) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.status !== 200 ){
        throw new Error("Error During the login Process! Try Again")
    }
};

export const authenticate = async(data: {
    email: string,
    emailToken: string
}) => {
    const response = await fetch(`${API_URL}/auth/authenticate`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.status !== 200 ){
        throw new Error("Error During the login Process! Try Again")
    }
    return response.json();
};