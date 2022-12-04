import "./SingleUser.scss";
import React, {useState,useEffect} from 'react';
import {default as Sidebar} from "../../components/SideBar/SideBarAdmin";
import {default as Navbar}from "../../components/NavBar/NavBarAdmin";
import List from "../../components/table/Table";
import axios from 'axios';
import { useParams,useNavigate } from "react-router-dom";
import { useGridApiMethod } from "@mui/x-data-grid";
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true};
const SingleUser = () => {
  let  id  = useParams();
  const Navigate = useNavigate();
  // options.params.userID = id;
  console.log(id);
  const [UserData,SetUserData] = useState({});
  const GetUserData = async () => {
    try{
    const userData =  await axios.post("/user/find",id,options);
     SetUserData(userData.data);
    }catch(err){
      console.log(err);
    }
  }
  const GoToEdit = () => {
     Navigate("edit",{state:{id}});
  }
  useEffect(()=>{
    GetUserData();
  },[])
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={GoToEdit}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{UserData.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{UserData.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Họ tên:</span>
                  <span className="itemValue">{UserData.fullname}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Được tạo:</span>
                  <span className="itemValue">
                   {UserData.createAt}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Coin:</span>
                  <span className="itemValue">{UserData.coin}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Exp:</span>
                  <span className="itemValue">{UserData.exp}</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
