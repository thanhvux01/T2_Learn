import React , {createContext, useState} from "react";
import {Routes,Route} from "react-router-dom";
import {default as HomePage} from "./pages/Home";
import {default as LearningPage} from "./pages/Learning";
import {default as RegisterPage} from "./pages/Register";
import {default as LoginPage} from "./pages/Login";
import {Lesson} from "./pages/Lesson";
import FlashCards from "./pages/FlashCards";
import SearchPage from "./pages/Search";
import Story from "./pages/Story";
import Reading from "./pages/Reading";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import "./Global.module.scss"
export const ThemeContext = createContext()
const App = () => {
  
  // const [SideBar,SetSideBar] = useState({
  //   "lesson":false,
  //   "flashcard":false,
  // });
  return (
    <>
        <Routes>
         <Route path="/" element={<HomePage/>} />
         <Route path="/learning" element={<LearningPage/>} />
         <Route path="/register" element={<RegisterPage/>} />
         <Route path="/search" element={<SearchPage/>} />
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/lesson" element={<Lesson/>  }/>
          {/*  <ThemeContext.Provider value={[SideBar,SetSideBar]}> <Lesson/></ThemeContext.Provider> */}
       
         <Route path="/flashcard" element={<FlashCards/>}/>
          {/*  <ThemeContext.Provider value={[SideBar,SetSideBar]}> <FlashCards/></ThemeContext.Provider> */}
          
           <Route path="/story" element={<Story/>}/>
           <Route path="/reading" element={<Reading/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/edit-profile" element={<EditProfile/>}/>
       </Routes>
     
    </>
    
  )
 
}

export default App;