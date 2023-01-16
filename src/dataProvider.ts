import axios, { AxiosResponse } from "axios";
import type { BaseKey, DataProvider, HttpError, MetaDataQuery } from "@pankod/refine-core";
import { TOKEN_KEY } from "authProvider";

const axiosInstance = axios.create();

const route:Record<string,string> = {
    "messages": "client/messages",
    "mymessages": "client/messages/my",
    "terrain": "client/terrain",
    "sports": "client/sport",
    "users": "admin/users",
    "carnets": "admin/carnet",
}

const createMessage = async (apiurl:string,data:any) => await axiosInstance.post(`${apiurl}/client/messages`,data.message,{
    headers: {
        'Content-Type': 'text/plain',
    },
})

const creator:Record<string,(apiurl:string,data:any)=>Promise<AxiosResponse<any,any>>> = {
    "messages": createMessage,
    "mymessages": createMessage,
    "terrain": async (apiurl,data)=>await axiosInstance.post(`${apiurl}/admin/terrain/save`,data),
    "sports": async (apiurl,data)=>await axiosInstance.post(`${apiurl}/admin/sport/save`,data),
    "carnets": async (apiurl,data)=>await axiosInstance.post(`${apiurl}/admin/carnet`,data),
    "users": async (apiurl,data)=>await axiosInstance.post(`${apiurl}/auth/register/${data.role === "ADMIN"?"false":"true"}`,data),
}

const updator:Record<string,(apiurl:string,data:any,id:BaseKey,metaData?:MetaDataQuery)=>Promise<AxiosResponse<any,any>>> = {
    "sports": async (apiurl,data)=> await axiosInstance.put(`${apiurl}/admin/sport/update`,data),
    "terrain": async (apiurl,data) => await axiosInstance.put(`${apiurl}/admin/terrain/update`,data),
    "carnets": async (apiurl,data,id,metaData) => {
        if(metaData?.operation === "BUY"){
            if(data.value)
                return await axiosInstance.post(`${apiurl}/admin/carnet/${id}/buy`,data.value,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            else
                throw new Error("Invalid Request");
        }
        return await axiosInstance.put(`${apiurl}/admin/carnet`,{
            id,
            nombreEntrees: data.nombreEntrees
        })
    }
}

const defCreator = async () => null

axiosInstance.interceptors.request.use((config)=>{
    const auth = `Bearer ${localStorage.getItem(TOKEN_KEY)}`
    if (config.headers == null)
        config.headers = {}
    Object.assign(config.headers, {
        Authorization: auth
    })
    return config
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const customError: HttpError = {
            ...error,
            message: error.response?.data?.message,
            statusCode: error.response?.status,
        };

        return Promise.reject(customError);
    },
);

const SimpleRestDataProvider = (apiurl: string):DataProvider => {
    return {
        async getList({resource}){
            const url = route[resource.toLowerCase()] ?? ""
            const { data } = await axiosInstance.get(`${apiurl}/${url}`)
            return {
                data,
                total: data.length
            }
        },
        async create({ resource, variables }){
            const c = creator[resource.toLowerCase()] ?? defCreator
            const { data } = await c(apiurl,variables)
            return {
                data,
            }
        },
        async update({ resource, variables, id, metaData }){
            const u = updator[resource.toLowerCase()] ?? defCreator
            const { data } = await u(apiurl,variables,id,metaData)
            return {
                data,
            }
        },
        async getOne({resource,id}){
            const url = route[resource.toLowerCase()] ?? ""
            const { data } = await axiosInstance.get(`${apiurl}/${url}/${id}`)
            return {
                data
            }
        },
        async deleteOne({id,resource}){
            const url = route[resource.toLowerCase()] ?? ""
            let { data } = await axiosInstance.delete(`${apiurl}/${url}/${id}`)
            return {
                data
            }
        },
        getApiUrl(){
            return apiurl
        }
    }
}

export default SimpleRestDataProvider