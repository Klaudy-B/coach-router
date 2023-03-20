import { serverError } from "./helpers";

const loader = async (url: RequestInfo|URL)=>{
    const res = await fetch(url,{
        credentials: "include"
    })
    if(res.status === 500){
        throw Error(serverError);
    }
    return await res.json();
}
export const checkLoginStateLoader = async ()=>{
    return await loader(`${import.meta.env.VITE_SERVER}/auth/check-login-state`);
}
export const subjectLoader = async ()=>{
    return await loader(`${import.meta.env.VITE_SERVER}/category`);
}