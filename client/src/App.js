import React , {createContext, useState} from "react";
import {Routes,Route} from "react-router-dom";
import {default as HomePage} from "./pages/Home";
import {default as LearningPage} from "./pages/Learning";
import {default as RegisterPage} from "./pages/Register";
import {default as LoginPage} from "./pages/Login";
import Upload from "./pages/Upload/Upload";
import {Lesson} from "./pages/Lesson";
import SingleWord from "./pages/single/SingleWord";
import Auth from "./pages/Auth/Auth";
import NewLesson from "./pages/new/NewLesson";
import NewUser from "./pages/new/NewUser";
import SingleUser from "./pages/single/SingleUser";
import SingleCourse from "./pages/single/SingleCourse";
import Statis from "./pages/Statis/Statis";
import FlashCards from "./pages/FlashCards";
import ListUsers from "./pages/list/ListUsers";
import ListCourses from "./pages/list/ListCourses"
import SearchPage from "./pages/Search";
import Story from "./pages/Story";
import Reading from "./pages/Reading";
import ListWords from "./pages/list/ListWords";
import ListLessons from "./pages/list/ListLessons";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Guide from "./pages/Guide";
import Admin from "./pages/Admin";
import "./Global.module.scss"
import NewWord from "./pages/new/NewWord";
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
           <Route path="/guide" element={<Guide/>}/>
           <Route path="/upload" element={<Upload/>}/>
           <Route path="/statis" element={<Statis/>}/>
           <Route path="/auth" element={<Auth/>}/>



           {/* ADMIN PAGE */}
           <Route path="/admin">
           <Route index element={<Admin />} />
           </Route>
           <Route path="/admin/courses"  >
           <Route index element={<ListCourses/>} />
           <Route path=":courseID" >
           <Route index element={<SingleCourse/>} />
           </Route>
           </Route>  
           
           <Route path="/admin/users">
            <Route index element={<ListUsers/>}/>
           <Route path=":userID"  >
           <Route index element={<SingleUser/>} />
           <Route path=":type"element={<NewUser/>} ></Route>
           </Route>
            </Route>  

           
           <Route path="/admin/words"  >
           <Route index element={<ListWords/>} />
           <Route path=":wordID" >
           <Route index element={<NewWord/>} />
           </Route>
           </Route>

            <Route path="/admin/lessons"  >
           <Route index element={<ListLessons/>} />
           <Route path=":lessonID" >
           <Route index element={<NewLesson/>} />
           </Route>
           </Route>    
     
       </Routes>
     
    </>
    
  )
 
}

export default App;