import React from "react";
import {Routes,Route} from "react-router-dom";
import {default as HomePage} from "./pages/Home";
import {default as LearningPage} from "./pages/Learning"
import {default as RegisterPage} from "./pages/Register"
import {default as LoginPage} from "./pages/Login"
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
       </Routes>
    </>
    
  )
 
}

export default App;