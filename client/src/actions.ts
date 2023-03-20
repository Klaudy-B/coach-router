import { serverError } from "./helpers";

const action = async (
    initialString: string,
    loadingString: string,
    url: RequestInfo|URL,
    method: string,
    body?: any
    )=>{
    try{
        const button: any = document.querySelector('form > button');
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

export const signupAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('Sign up', 'Signing up...', `${import.meta.env.VITE_SERVER}/auth/signup`, 'POST', {
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
    const data = await action('Continue', 'Please wait...', `${import.meta.env.VITE_SERVER}/auth/login`, 'POST', {
        username: formData.get('username'),
        password: formData.get('password')
    });
    return data;
}
export const subjectAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('Continue', 'Please wait...', `${import.meta.env.VITE_SERVER}/auth/subject`, 'POST', {
        category: formData.get('category'),
        name: formData.get('name'),
        price: formData.get('price')
    });
    return data;
}