import { serverError } from "./helpers";

const action = async (
    formId: string,
    initialString: string,
    loadingString: string,
    url: RequestInfo|URL,
    method: string,
    body?: any
    )=>{
    try{
        const button: any = document.querySelector(`form#${formId} > button`);
        button.disabled = true;
        button.innerText = loadingString;
        let res;
        if(method === 'GET'){
            res = await fetch(url,{
                method,
                credentials: 'include',
            })
            if(res.status === 500){
                throw Error(serverError);
            }
            button.disabled = false;
            button.innerText = initialString;
            return {ok: res.ok};
        }
        res = await fetch(url,{
            method,
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                "content-type": "application/json"
            }
        })
        if(res.status === 500){
            throw Error(serverError);
        }
        const data = await res.json();
        button.disabled = false;
        button.innerText = initialString;
        return data;
    }catch(error: any){
        throw Error(error.message);
    }
}
export const ProfilePictureAction = async ()=>{
    const picture = (document.querySelector('form#profile-picture-form>input[type=file]') as any).files[0];
    const formData = new FormData();
    formData.append('picture', picture);
    const button: any = document.querySelector('form#profile-picture-form > button');
    button.innerText = 'Please wait...'; 
    const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/profile-picture`, {
        method: "POST",
        body: formData,
        credentials: "include"
    })
    if(res.status === 500){
        throw Error(serverError);
    }
    button.innerText = 'Submit'; 
    return await res.json();
}

export const signupAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('signup-form', 'Sign up', 'Signing up...', `${import.meta.env.VITE_SERVER}/auth/signup`, 'POST', {
        name: formData.get('name'),
        username: formData.get('username'),
        email: formData.get('email'),
        password1: formData.get('password'),
        password2: formData.get('confirm-password')
    })
    return data;
}
export const loginAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('login-form', 'Continue', 'Please wait...', `${import.meta.env.VITE_SERVER}/auth/login`, 'POST', {
        username: formData.get('username'),
        password: formData.get('password')
    });
    return data;
}
export const subjectAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('subject-form','Submit', 'Please wait...', `${import.meta.env.VITE_SERVER}/auth/subject`, 'POST', {
        category: formData.get('category'),
        name: formData.get('name'),
        price: formData.get('price')
    });
    return data;
}
export const logoutAction = async ()=>{
    const res = await fetch(`${import.meta.env.VITE_SERVER}/auth/logout`, {
        credentials: 'include'
    });
    if(!res.ok){
        throw Error(serverError);
    }
    return null;
}