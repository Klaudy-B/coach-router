export const urls = {
    signup: '/signup',
    login: '/login',
    home: '/',
    subject: '/subject',
    profilePicture: '/profile-picture',
    profile: '/profile-page',
    search: '/search',
    username: '/username',
    password: '/password',
    deleteAccount: '/delete-account',
    changeEmail: '/change-email',
    verifyEmail: '/verify-email',
    settings: '/settings',
    forgotPassword: '/forgot-password',
    forgotUsername: '/forgot-username',
    recoverPassword: '/recover-password',
}
export const placeHolders = {
    emailPlaceHolder: 'xyz@example.com',
    password1PlaceHolder: 'Password must have at list 8 characters',
    password2PlaceHolder: 'Enter your password again',
    searchCoachPlaceHolder: 'You can type names, emails or prices to get coaches that suit you'
}
export const serverError = 'There is a problem on the server.';
export const reducer = (state: any, action: any)=>{
    return action;
}
export const setTitle = (title: string)=>{
    document.title = `${title} | ${import.meta.env.VITE_APP_NAME.charAt(0).toUpperCase()}${import.meta.env.VITE_APP_NAME.slice(1)}`;
}