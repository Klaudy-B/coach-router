import { serverError } from "./helpers";

const action = async (
    formId: string,
    loadingString: string,
    url: RequestInfo|URL,
    method: string,
    body?: any
    )=>{
    try{
        const button = (document.querySelector(`form#${formId} > button`) as any);
        button.disabled = true;
        const initialString = button.innerText;
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
            return await res.json();
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
export const verificationAction = async (request: any, formId: string, verifyUrl: RequestInfo|URL, codeUrl: RequestInfo|URL)=>{
    try{
        const button = (document.querySelector(`form#${formId} button`) as any);
        button.disabled = true;
        if(button.innerText === 'Submit'){
            button.innerText = 'Please wait...';
            const formData = await request.formData();
            const res = await fetch(verifyUrl,{
                method: 'POST',
                body: JSON.stringify({
                    verificationCode: formData.get('verification-code')
                }),
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
            button.innerText = 'Submit';
            return data;
        }
        if(button.innerText === 'Send me the code'){
            button.innerText = 'Please wait...';
            const res = await fetch(codeUrl, {
                credentials: 'include'
            })
            if(res.status === 500){
                throw Error(serverError);
            }
            const data = await res.json();
            button.disabled = false;
            button.innerText = 'Send me the code';
            return data;
        }
    }catch(error){
        console.log(error);
        return null;
    }
}
export const ProfilePictureAction = async ()=>{
    const picture = (document.querySelector('form#profile-picture-form>input') as any).files[0];
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
    const data = await action('signup-form', 'Signing up...', `${import.meta.env.VITE_SERVER}/auth/signup`, 'POST', {
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
    const data = await action('login-form', 'Please wait...', `${import.meta.env.VITE_SERVER}/auth/login`, 'POST', {
        username: formData.get('username'),
        password: formData.get('password')
    });
    return data;
}
export const subjectAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('subject-form', 'Please wait...', `${import.meta.env.VITE_SERVER}/auth/subject`, 'POST', {
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
export const coachesAction = async(arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action('search', 'Searching...', `${import.meta.env.VITE_SERVER}/coaches/${formData.get('search')}/pattern`, 'GET');
    return data;
}
export const usernameAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("username-form", 'Changing your username...', `${import.meta.env.VITE_SERVER}/auth/change-username`, 'PATCH', {
        username: formData.get('new-username'),
        password: formData.get('password')
    });
    return data;
}
export const passwordAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("password-form", 'Changing your password...', `${import.meta.env.VITE_SERVER}/auth/change-password`, 'PATCH', {
        password1: formData.get('current-password'),
        password2: formData.get('new-password'),
        password3: formData.get('new-password-confirmation')
    })
    return data;
}
export const EmailAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("email-form", 'Changing email...', `${import.meta.env.VITE_SERVER}/auth/change-email`, 'PATCH', {
        email: formData.get('email'),
        password: formData.get('password')
    })
    return data;
}
export const deleteAccountAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const body = {
        password: formData.get('password')
    }
    const data = await action('delete-account-form', 'Deleting account...', `${import.meta.env.VITE_SERVER}/auth/delete-account`, 'DELETE', body);
    return data;
}
export const forgotPasswordAction = async (arg: any)=>{
    const data = await verificationAction(arg.request, "forgot-password-form", `${import.meta.env.VITE_SERVER}/auth/forgot-password`, `${import.meta.env.VITE_SERVER}/auth/forgot-password`);
    return data;
}
export const verifyEmailAction = async (arg: any)=>{
    const data = await verificationAction(arg.request, "verify-email-form", `${import.meta.env.VITE_SERVER}/auth/verify-email`, `${import.meta.env.VITE_SERVER}/auth/verify-email`);
    return data;
}
export const recoverPasswordAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("recover-password-form", 'Changing your password...', `${import.meta.env.VITE_SERVER}/auth/recover-password`, 'POST', {
        password2: formData.get('new-password'),
        password3: formData.get('new-password-confirmation')
    })
    return data;
}
export const forgotUsernameAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("forgot-username-form", 'Searching...', `${import.meta.env.VITE_SERVER}/auth/forgot-username`, 'POST', {
        username: formData.get('username'),
    })
    return data;
}
export const changeSubjectAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("change-subject-form", 'Changing your subject...', `${import.meta.env.VITE_SERVER}/auth/change-subject`, 'PATCH', {
        subjectName: formData.get('new-subject'),
        category: formData.get('category'),
        price: formData.get('price'),
        password: formData.get('password')
    });
    return data;
}
export const bioAction = async (arg: any)=>{
    const formData = await arg.request.formData();
    const data = await action("bio", "Please wait...", `${import.meta.env.VITE_SERVER}/auth/bio`, 'POST', {
        bio: formData.get('bio')
    })
    return data;
}