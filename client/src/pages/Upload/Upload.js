import React, { useEffect, useRef,useState } from 'react';
import "./Upload.scss"
import axios from 'axios';
import {Button,Form} from 'react-bootstrap';
import {io} from "socket.io-client";
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,
headers: {
    'Content-Type': 'multipart/form-data'
  }
}

const Upload = () => {
   const [Message,SetMessage] = useState([]);
   const refSignal = useRef();
   const refMessage = useRef();
   const socket =  io("http://localhost:5050");
   
    useEffect( ()=>{
        socket.on("connect",()=>{       
             refSignal.current.innerText = "Connected:  " +socket.id;
            })
     socket.on('receive-message',message=>{
                refMessage.current.innerText = message
    
            })
    },[])
   useEffect(()=>{
    
   })
   return (
      <div className='Box'>
        <Button>Connect</Button>
        <Form.Control as="textarea" aria-label="With textarea" />
        <Form.Control aria-label="With textarea" />
        <Button onClick={()=>{socket.emit("send-message","Hello")}}>Send</Button>
        <div className='History'>
         <p>History</p>
         <p ref={refSignal}>ABC</p>
         <p ref={refMessage}></p>
          { Message && Message.map((item,i)=>{return <p key={i}>{item}</p>})}
        </div>
      </div>
   )
}

export default Upload