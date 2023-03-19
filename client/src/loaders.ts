import { serverError } from "./helpers";

export const checkLoginStateLoader = async ()=>{
    console.log('loader')
    const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/check-login-state`,{
        credentials: "include"
    })
    if(res.status === 500){
        throw Error(serverError);
    }
    const data = await res.json();
    return data;
}