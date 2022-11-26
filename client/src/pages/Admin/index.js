import React, { useEffect } from 'react'
import axios from "axios";
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
    <div>Admin</div>
  )
}

export default Admin