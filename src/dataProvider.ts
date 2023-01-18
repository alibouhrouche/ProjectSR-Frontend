import axios, { AxiosResponse } from "axios";
import type { BaseKey, DataProvider, HttpError, MetaDataQuery } from "@pankod/refine-core";
import { TOKEN_KEY } from "authProvider";
import QueryString from "query-string";
import { CarnetCreate, MessageCreate, SportData, TerrainData, UserCreate } from "interfaces";
import { CrudSorting } from "@pankod/refine-core";
const { stringify } = QueryString
const axiosInstance = axios.create();

const generateSort = (sort?: CrudSorting) => {
    if (sort && sort.length > 0) {
        const _sort: string[] = [];
        const _order: string[] = [];

        sort.map((item) => {
            _sort.push(item.field);
            _order.push(item.order);
        });

        return {
            _sort,
            _order,
        };
    }

    return;
};

const route:Record<string,string> = {
    "messages": "client/messages",
    "mymessages": "client/messages/my",
    "terrain": "client/terrain",
    "sports": "client/sport",
    "users": "admin/users",
    "carnets": "admin/carnet",
    "profile": "auth/currentUser"
}

const createMessage = async (apiurl:string,data:MessageCreate) => await axiosInstance.post(`${apiurl}/client/messages`,data.message,{
    headers: {
        'Content-Type': 'text/plain',
    },
})

const creator:Record<string,(apiurl:string,data:any)=>Promise<AxiosResponse<any,any>>> = {
    "messages": createMessage,
    "mymessages": createMessage,
    "terrain": async (apiurl,data:TerrainData)=>await axiosInstance.post(`${apiurl}/admin/terrain/save`,data),
    "sports": async (apiurl,data:SportData)=>await axiosInstance.post(`${apiurl}/admin/sport/save`,data),
    "carnets": async (apiurl,data:CarnetCreate)=>await axiosInstance.post(`${apiurl}/admin/carnet`,data),
    "users": async (apiurl,data:UserCreate)=>await axiosInstance.post(`${apiurl}/auth/register/${data.role === "ADMIN"?"false":"true"}`,data),
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
    },
    "users": async (apiurl,data) => await axiosInstance.put(`${apiurl}/admin/users`,data),
    "profile":  async (apiurl,data) => await axiosInstance.put(`${apiurl}/client/profile`,data)
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
        async getList({resource, hasPagination, pagination = { current: 1, pageSize: 10 }, sort, filters}){
            const url = route[resource.toLowerCase()] ?? ""
            const { current = 1, pageSize = 10 } = pagination ?? {};

            const queryFilters:Record<string,string> = {};

            const query: {
                _page?: number;
                _size?: number;
                _sort?: string;
                _order?: string;
            } = hasPagination
                ? {
                    _page: current,
                    _size: pageSize,
                }
                : {};
                const generatedSort = generateSort(sort);
                if (generatedSort) {
                    const { _sort, _order } = generatedSort;
                    query._sort = _sort.join(",");
                    query._order = _order.join(",");
                }
                if (filters) {
                    filters.forEach((filter) => {
                        if (filter.operator === "or" || filter.operator === "and") {
                            throw new Error(
                                `\`operator: ${filter.operator}\` is not supported.`,
                            );
                        }
                        if ("field" in filter) {
                            const { field, operator, value } = filter;
                            if (operator === "eq") {
                                queryFilters[field] = value;
                            }
                        }
                    })
                }
                const { data, headers } = await axiosInstance.get(`${apiurl}/${url}?${stringify(query)}&${stringify(queryFilters)}`)
                const total = +(headers["x-total-count"] ?? data.length);
                return {
                    data,
                    total
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
            if(resource === "Profile"){
                const { data } = await axiosInstance.get(`${apiurl}/auth/currentUser`)
                return {
                    data
                }
            }else{
                const url = route[resource.toLowerCase()] ?? ""
                const { data } = await axiosInstance.get(`${apiurl}/${url}/${id}`)
                return {
                    data
                }
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