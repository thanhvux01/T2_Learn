import React, { useEffect } from 'react'
import axios from "axios";
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import Widget from "../../components/widget/Widget";
import "./Admin.scss";
import Table from "../../components/table/Table";
import { useNavigate } from 'react-router-dom';
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};

const Admin = () => {
    const navigate = useNavigate();
    const CheckAdmin = async () => {
        try{
        const res = await axios.get("/auth/check-admin",options);
            
       }catch(err){
        navigate("/");
       }
       }
  CheckAdmin();
  useEffect(()=>{
    
  })
  return (
    <div className="home">
    <Sidebar />
    <div className="homeContainer">
      <Navbar />
      <div className="widgets">
        <Widget type="user" />
        <Widget type="order" />
        <Widget type="lessons" />
        <Widget type="words" />
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <Table />
      </div>
    </div>
  </div>
  )
}

export default Admin