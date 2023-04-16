import React, { lazy, LazyExoticComponent, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './index.sass';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Loading from './components/Loading';
const BaseLayout: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/BaseLayout'));
const Username: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/Username'));
const Password: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/Password'));
const Email: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/Email'));
const DeleteAccount: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/DeletAccount'));

import Oops from './components/Oops';

const Home: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Home'));
const NotFound: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/NotFound'));
const Login: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Login'));
const Signup: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Signup'));
const Subject: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Subject'));
const ProfilePicture: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/ProfilePicture'));
const Profile: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Profile'));
const Search: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Search'));
const Settings: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Settings'));

import { coachesAction, deleteAccountAction, EmailAction, loginAction, logoutAction, passwordAction, ProfilePictureAction, signupAction, subjectAction, usernameAction } from './actions';

import { checkLoginStateLoader, subjectLoader } from './loaders';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<BaseLayout />} loader={checkLoginStateLoader} action={logoutAction} errorElement={<Oops />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} action={loginAction} />
      <Route path='signup' element={<Signup />} action={signupAction} />
      <Route path='subject' element={<Subject />} loader={subjectLoader} action={subjectAction} />
      <Route path='profile-picture' element={<ProfilePicture />} action={ProfilePictureAction} />
      <Route path='profile-page/:username' element={<Profile />} />
      <Route path='search' element={<Search />} action={coachesAction} />
      <Route path='settings' element={<Settings />} errorElement={<Oops />}>
        <Route path='username' element={<Username />} action={usernameAction} />
        <Route path='password' element={<Password />} action={passwordAction} />
        <Route path='change-email' element={<Email />} action={EmailAction} />
        <Route path='delete-account' element={<DeleteAccount />} action={deleteAccountAction} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
)