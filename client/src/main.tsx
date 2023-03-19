import React, { lazy, LazyExoticComponent, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import './index.scss'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Loading from './components/Loading';
const BaseLayout: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/BaseLayout'));
import Oops from './components/Oops';

const Home: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Home'));
const NotFound: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/NotFound'));
const Login: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Login'));
const Signup: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Signup'));

import { loginAction, signupAction } from './actions';

import { checkLoginStateLoader } from './loaders';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<BaseLayout />} errorElement={<Oops />}>
      <Route index element={<Home />} loader={checkLoginStateLoader} />
      <Route path='login' element={<Login />} action={loginAction} />
      <Route path='signup' element={<Signup />} action={signupAction} />
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
