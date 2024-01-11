import './App.scss';

import React, { Fragment, useEffect } from "react"; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {routes} from './routes/index'
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isJsonString } from './utils';
//import { useQuery } from '@tanstack/react-query';
import jwt_decode from "jwt-decode";
import * as UserService from './servives/UserService'
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from './redux/slides/userSlide';
import { useState } from 'react';

function App() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded();
  
    if (decoded?.id) {
      handleGetDetailsUser(decoded.id, storageData);
    }
    setIsLoading(false)

  }, []);
  

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token') 
    let decoded = {}
    if(storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData)
        decoded = jwt_decode(storageData)
    }
    return {decoded, storageData}
  }

  UserService.axiosJWT.interceptors.request.use(async function (config) {
    // Do something before request is sent
    const currentTime = new Date();
    const { decoded } = handleDecoded();
  
    if (decoded?.exp < currentTime.getTime() / 1000) {
      try {
        const data = await UserService.refreshToken();
        config.headers['token'] = `Bearer ${data?.access_token}`;
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.response?.data, access_token: token}))
}

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route)=> {
            const Page = route.page
            const ischeckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path} path={ route.path} element={
              <Layout>
                <Page />
              </Layout>
            } />
            )
          })}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </div>
  )
}

export default App;
