import { sendJSON } from "./utils";

export async function auth(email:string,password:string) {
    try {
        return await sendJSON<{
            token: string
        }>("auth/authenticate",{
            email,
            password
        })
    } catch (error) {
        throw new Error("Wrong Email or Password");
    }
}