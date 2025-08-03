import { useState } from 'react'
import './App.css'
// import FormInput from './Components/FormInput'
import FormInput1 from './Components/FormInput1'
import { useEffect } from 'react';
import { fetchData } from "./Firebase/auth" 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './Components/UserList';
import MainPage from './Components/Mainpage';
import UserInfo from './Components/UserInfo';
import WelcomePage from './Components/WelcomePage';

function App() {

  // Firebase db checking
// useEffect(() => {
//   fetchData();
// }, []);




  return (
      <BrowserRouter>
        <>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/main" element={ <MainPage>
                                       < FormInput1 />
                                      </MainPage> } />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/userinfo/:name" element={<UserInfo />} />
          </Routes>
        </>
      </BrowserRouter>
  )
}

export default App
