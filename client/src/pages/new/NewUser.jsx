import "./NewUser.scss";
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import {Form} from 'react-bootstrap';
import axios from 'axios';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState , useRef } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};

const NewUser = ({ inputs, title }) => {
  const {state} = useLocation();
   const {id} = state;
  // const {UserData={password:123,fullname:"123",coin:123,email:"123",birthday:"123"}} = state;
  const [UserData,SetUserData] = useState({});
  const [file, setFile] = useState("");
  const GetUserData = async () => {
    try{
    const userData =  await axios.post("/user/find",id,options);
     SetUserData(userData.data);
    }catch(err){
      console.log(err);
    }
  }
  const BindingValue = () => {
    try{
      refPassword.current.value = UserData.password;
      refName.current.value = UserData.fullname;
      refCoin.current.value = UserData.coin;
      refExp.current.value = UserData.exp;
      refMail.current.value = UserData.email;
      refBirthday.current.value = UserData.birthday;
    }catch(err){
      console.log(err);
    }
  }
  const refPassword = useRef() , refName = useRef() , refBirthday = useRef() , refCoin = useRef() , refExp = useRef() , refMail = useRef();
  useEffect(()=>{
    GetUserData();
    },[])
  useEffect(()=>{
    BindingValue();
  })
  const UpdateUser = async () => {
    try{
       const handleUser = {
          _id:UserData._id,
          coin:refCoin.current.value,
          exp: refExp.current.value, 
          mail: refMail.current.value,
          birthday: refBirthday.current.value,
          fullname: refName.current.value, 
        } 
        await axios.post("/user/update-user",handleUser,options)

    }catch(err){
       console.log(err);
    }
  }
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
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
              <label>Họ tên</label>
              <input type="text" ref={refName}></input>
            </span>
            <span className={"formInput Password"}>
            <label>Password</label>
              <input type="text" ref={refPassword}></input>
            </span>
            <span className={"formInput Coin"}>
            <label>Coin</label>
              <input type="text" ref={refCoin}></input>
            </span>
            <span className={"formInput Exp"}>
            <label>Exp</label>
              <input type="text" ref={refExp}></input>
            </span>
            <span className={"formInput Mail"}>
            <label>Mail</label>
              <input type="text" ref={refMail}></input>
            </span>
            <span className={"formInput Mail"}>
            <label>Ngày sinh</label>
             <Form.Control required type="date" className="inputDate" ref={refBirthday} />
             </span>
             <span className="button" onClick={UpdateUser}>SEND</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUser;
