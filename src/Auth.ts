import { RegisterRequest } from "interfaces";
import { sendJSON } from "./utils";

export async function auth(email:string,password:string) {
    return await sendJSON<{
        token: string
    }>("auth/authenticate",{
        email,
        password
    })
}

export async function registerUser(data:RegisterRequest) {
    return await sendJSON<{
        token: string
    }>("auth/register/true",data)
}