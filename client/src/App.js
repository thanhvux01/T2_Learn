import React , {createContext, useState} from "react";
import {Routes,Route} from "react-router-dom";
import {default as HomePage} from "./pages/Home";
import {default as LearningPage} from "./pages/Learning";
import {default as RegisterPage} from "./pages/Register";
import {default as LoginPage} from "./pages/Login";
import {default as Search} from "./pages/Search";
import {Lesson} from "./pages/Lesson";
import FlashCards from "./pages/FlashCards";
import "./Global.module.scss"
export const ThemeContext = createContext()
const App = () => {
  
  // const [SideBar,SetSideBar] = useState({
  //   "lesson":false,
  //   "flashcard":false,
  // });
  return (
    //<h1>React<h1>
    <>
      
       <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/learning" element={<LearningPage/>} />
         <Route path="/register" element={<RegisterPage/>} />
         <Route path="/login" element={
         <LoginPage/>}/>
         <Route path="/search" element={<Search/>}/>
         <Route path="/lesson" element={<Lesson/>
          //  <ThemeContext.Provider value={[SideBar,SetSideBar]}> <Lesson/></ThemeContext.Provider>
         }/>
         <Route path="/flashcard" element={<FlashCards/>
          // <ThemeContext.Provider value={[SideBar,SetSideBar]}> <FlashCards/></ThemeContext.Provider>
         }/>
       </Routes>
     
    </>
    
  )
 
}

export default App;