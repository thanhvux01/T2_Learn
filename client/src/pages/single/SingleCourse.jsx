import "./SingleCourse.scss";
import React, {useState,useEffect,useRef} from 'react';
import {default as Sidebar} from "../../components/SideBar/SideBarAdmin";
import {default as Navbar}from "../../components/NavBar/NavBarAdmin";
import axios from 'axios';
import { useParams } from "react-router-dom";
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const SingleCourse = () => {
   const [Data,SetData] = useState({});
   const refName = useRef(),refDesc = useRef(),refID = useRef(), refPrice = useRef();
   let  {courseID}  = useParams();
   const SetValue = () => {
      try{
          refName.current.value = Data.name;
          refDesc.current.value = Data.description;
          refID.current.value = Data.courseID;
          refPrice.current.value = Data.price;
      }catch(err){
          
      }
   }
   const GetData = async () => {
    try{     
        const courseData = await axios.post("/khoahoc/single-course",{courseID},options)
        SetData(courseData.data);   
        console.log(courseData.data)   
        
    }catch(err){
       // Hien thi 404 not found
    }
   }
   const Update = async () => {
      try{
          const data = {
              name:refName.current.value,
              description:refDesc.current.value,
              courseID:Data.courseID,
              price:refPrice.current.value,
          }
        await axios.post("/khoahoc/update-course",{data},options);  

      }catch(err){

      }
   }
   const Delete = async ( ) => {
    try{

    }catch(err){

    }
   }
  useEffect(()=>{
   GetData();
  },[])
  useEffect(()=>{
    SetValue();
  })
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
         <div className="leftImage">
          <img src="https://iili.io/Hf7nCJa.md.jpg"/>
         </div>
         <div className="content">
         <div className="info">
         <span className="title-content">Tên khóa học </span>
         <input className="detail" ref={refName}></input>
         </div>
         <div className="desc info">
         <span className="title-content" style={{height:"50px"}}>Description </span>
         <textarea className="detail" style={{height:"50px"}} ref={refDesc}></textarea>
         </div>
         <div className="info">
         <span className="title-content">Giá </span>
         <input className="detail" ref={refPrice}></input>
         </div>
         <div className="info">
         <span className="title-content" >ID </span>
         <input className="detail" ref={refID} readOnly></input>
         </div>
      
         <div className="line">
            <span className="btn" onClick={Update}>Sửa</span>
            <span className="btn" onClick={Delete}>Xóa</span>
          </div>
         </div>

        </div>
        <div className="bottom">
        <h1 className="title">Last Transactions</h1>
       
        </div>
      </div>
    </div>
  )
}

export default SingleCourse