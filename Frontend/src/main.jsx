import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx'
import Home from './Components/Home.jsx';
import Footer from './Components/Footer.jsx'
import Signup from './Components/Signup.jsx'
import Login from './Components/Login.jsx'
import Header from './Components/Header.jsx'
import Banner from './Components/MovieCover/Banner.jsx';
import MovieCoverPage from './Components/MovieCover/MovieCoverPage.jsx';
import CreateList from './Components/CreateList.jsx';
import ShowList from './Components/ShowList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={< Login />} />
      <Route path='/Home' element={< Home />} />
      <Route path='/Footer' element={< Footer />} />
      <Route path='/Signup' element={< Signup />} />
      <Route path='/Header' element={< Header />} />
      <Route path='/createList' element={< CreateList />} />
      <Route path='/MovieCover/Banner' element={< Banner />} />
      <Route path='/ShowList/:title' element={< ShowList />} />
      <Route path='/MovieCover/MovieCoverPage' element={< MovieCoverPage />} />
    </Route>

  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)