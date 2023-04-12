import React, { lazy, LazyExoticComponent, Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import './index.sass';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Loading from './components/Loading';
const BaseLayout: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/BaseLayout'));
import Oops from './components/Oops';

const Home: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Home'));
const NotFound: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/NotFound'));
const Login: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Login'));
const Signup: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Signup'));
const Subject: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Subject'));
const ProfilePicture: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/ProfilePicture'));
const Profile: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Profile'));
const Search: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Search'));

import { coachesAction, loginAction, logoutAction, ProfilePictureAction, signupAction, subjectAction } from './actions';

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