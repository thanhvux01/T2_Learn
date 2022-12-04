import "./NewLesson.scss";
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import axios from 'axios';
import LessonPopUp from "../../components/LessonPopUp/LessonPopUp";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState , useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};

const NewLesson = ({ inputs, title }) => {
  const id = useParams();
  // const {UserData={password:123,fullname:"123",coin:123,email:"123",birthday:"123"}} = state;
  const [LessonData,SetLessonData] = useState({});
  const [file, setFile] = useState("");
  const [PopUp,SetPopUp] = useState(false);
  const refName = useRef() , refDesc = useRef();
  const GetLessonData = async () => {
    try{
     const LessonData =  await axios.post("/khoahoc/single-lesson",id,options);
     SetLessonData(LessonData.data);
    
    }catch(err){
      console.log(err);
    }
  }
  
  const BindingValue = () => {
    try{
      refName.current.value = LessonData.name;
      refDesc.current.value = LessonData.description;
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    GetLessonData();
    },[])
 useEffect(()=>{
    BindingValue();
  })
  const UpdateWord = async () => {
    try{
       const handleWord = { 
          name:refName.current.value,
          description: refDesc.current.value, 
        } 
        await axios.post("/tuvung/update",handleWord,options)
        
    }catch(err){
        //render Error Page
       console.log(err);
    }
  }
  const ShowPopUp = () => {
     SetPopUp(!PopUp);
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{LessonData.name}</h1>
        </div>
        <div className="bottom">
          <div className="left">
                <img
                src={
                    file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                />
          </div>
          <div className="right">
            <form>
            <span className={"formInput Name"}>
              <label>Tên</label>
              <input type="text" ref={refName}></input>
            </span>
            <span className={"formInput Password"}>
            <label>Mô tả</label>
              <input type="text" ref={refDesc}></input>
            </span>

            </form>
          </div>
        </div>
        <div className="bottom">
           <span className="add" onClick={ShowPopUp}>
             <FontAwesomeIcon icon={faPlus}/>
           </span>
           {LessonData["content"] && LessonData["content"].map((item,i)=>{
              return  <span className="question" key={i}>{item["content"].result} </span>
           }) }
        </div>
      </div>
    {PopUp && <LessonPopUp ShowPopUp={ShowPopUp} lessonID={id.lessonID}/> }
    </div>
  );
};

export default NewLesson;
