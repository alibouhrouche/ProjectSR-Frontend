import { TOKEN_KEY } from "authProvider"
import config from "./config"

export async function sendJSON<T>(url:string,data:any):Promise<T> {
    let res = await fetch(`${config.api_base}/${url}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    if(!res.ok) throw new Error("Failed Request");
    return await res.json()
}

export async function getJSON<T>(url:string):Promise<T> {
    let res = await fetch(`${config.api_base}/${url}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
    })
    return await res.json()
}

export async function deleteJSON<T>(url:string):Promise<T> {
    let res = await fetch(`${config.api_base}/${url}`,{
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
        },
    })
    return await res.json()
}