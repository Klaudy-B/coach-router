import React, { lazy, LazyExoticComponent, Suspense } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Loading from './components/Loading';
const BaseLayout: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./components/BaseLayout'));

const Home: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Home'));
const NotFound: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/NotFound'));
const Login: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Login'));
const Signup: LazyExoticComponent<()=> JSX.Element> = lazy(()=>import('./pages/Signup'));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<BaseLayout />}>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<Signup />} />
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
