import React from "react";
import {Routes,Route} from "react-router-dom";
import {default as HomePage} from "./pages/Home";
import {default as LearningPage} from "./pages/Learning";
import {default as RegisterPage} from "./pages/Register";
import {default as LoginPage} from "./pages/Login";
import {default as Search} from "./pages/Search";
import {default as Lesson} from "./pages/Lesson";
import "./Global.module.scss"


const App = () => {
  return (
    //<h1>React<h1>
    <>
       
       <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/learning" element={<LearningPage/>} />
         <Route path="/register" element={<RegisterPage/>} />
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/search" element={<Search/>}/>
         <Route path="/lesson" element={<Lesson/>}/>
       </Routes>
    </>
    
  )
 
}

export default App;