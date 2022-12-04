import "./NewWord.scss";
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState , useRef } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};

const NewWord = ({ inputs, title }) => {
  const id = useParams();
  
  // const {UserData={password:123,fullname:"123",coin:123,email:"123",birthday:"123"}} = state;
  const [WordData,SetWordData] = useState({});
  const [file, setFile] = useState("");
  const refWord = useRef() , refMeaning = useRef() , refPhonetic = useRef() , refPartOfSpeech = useRef();
  const GetWordData = async () => {
    try{
     const WordData =  await axios.post("/tuvung/find",id,options);
     SetWordData(WordData.data);

    }catch(err){
      console.log(err);
    }
  }
  
  const BindingValue = () => {
    try{
      refWord.current.value = WordData.name;
      refMeaning.current.value = WordData.meaning;
      refPhonetic.current.value = WordData.phonetic;
      refPartOfSpeech.current.value = WordData.partofspeech;

    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    GetWordData();
    },[])
 useEffect(()=>{
    BindingValue();
  })
  const UpdateWord = async () => {
    try{
       const handleWord = { 
          name:refWord.current.value,
          meaning: refMeaning.current.value, 
          phonetic: refPhonetic.current.value,
          partofspeech: refPartOfSpeech.current.value,
        } 
        await axios.post("/tuvung/update",handleWord,options)
        
    }catch(err){
        //render Error Page
       console.log(err);
    }
  }
  return (
    <div className="new-word">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
                {/* <img
                src={
                    file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
                /> */}
          </div>
          <div className="right">
            <form>
            <span className={"formInput Name"}>
              <label>Từ</label>
              <input type="text" ref={refWord}></input>
            </span>
            <span className={"formInput Password"}>
            <label>Nghĩa</label>
              <input type="text" ref={refMeaning}></input>
            </span>
            <span className={"formInput Coin"}>
            <label>Phát âm</label>
              <input type="text" ref={refPhonetic}></input>
            </span>
            <span className={"formInput Exp"}>
            <label>Loại từ</label>
              <input type="text" ref={refPartOfSpeech}></input>
            </span>
             <span className="button" onClick={UpdateWord}>SEND</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewWord;
