import React from 'react'
import { Reset } from 'styled-reset'
import './App.css';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Main from './pages/Main';
import MyPage from './pages/Mypage';
import Header from './components/Header';
import {Routes, Route} from "react-router-dom"
import MyChatbot from './pages/Chatbot';
import { createGlobalStyle } from 'styled-components';
import Guide from './pages/Guide';
import SignIn from './pages/SignIn';
import RealtyList from "./pages/RealtyList"
import Details from './pages/Details';
import TestPage from './pages/TestPage';






function App() {
  
  
  const GlobalStyles = createGlobalStyle``

  return (
    
    <div className="App">
      <Reset/>
      <GlobalStyles/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="//login/oauth2/code/user/sign-up" element={<Onboarding/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path="/main" element={<><Header/><Main/></>}/>
        <Route path="/mypage" element={<><Header/><MyPage/></>}/>
        <Route path="/chatbot" element={<MyChatbot/>}/>
        <Route path="/guide" element={<><Header/><Guide/></>}/>
        <Route path="/realty-list" element={<><Header/><RealtyList/></>}/>
        <Route path='/details' element={<><Header/><Details/></>}/>
        <Route path='/1' element={<><Header/><TestPage/></>}/>
      </Routes>
      
    </div>
    
    
  );
}

export default App;
