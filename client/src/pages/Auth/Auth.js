import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Auth = () => {
  const Navigate = useNavigate();
  const CheckAuth = async () => {
     const token = await axios.get("http://localhost:5000/api/auth/checkpoint",{withCredentials:true});
     if(token["data"].isAdmin){
          Navigate("/admin")
     }else{
        Navigate("/learning")
     }
  }
  useEffect(()=>{
     CheckAuth();
  },[])
  return (
    <div></div>
  )
}

export default Auth