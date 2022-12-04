import React, { useEffect, useRef,useState } from 'react';
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,
// headers: {
//     'Content-Type': 'multipart/form-data'
//   }
}

const Upload = () => {
    const refInput = useRef();
    const [File,SetFile] = useState();
    const ShowFile = async () => {
        try{
            console.log(File);
             let formData = new FormData();
            formData.append("File", File);
          
        // console.log(refInput.current.value)
        await axios({
            url: 'http://localhost:5000/api/transfer/file',
            method: "POST",
            data: {Name:"Thanh",File:File},
            // headers: {
            //   'Content-Type': 'multipart/form-data'
            // }
        })
        }catch(err){
            console.log(err);
        }
    }
    const HandleFile = async (event) => {
        SetFile(event.target.files[0]);
        try{
            
            let formData = new FormData();
            formData.append('meta.title', "the best title")
            formData.append('meta.title2', "the best title")
            // formData.append("file", event.target.files[0]);
                for(var pair of formData.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]); 
            }
            
        // console.log(refInput.current.value)
        await axios.post("/transfer/file",formData,options);
        }catch(err){
            console.log(err);
        }
    }
   
  return (

    <div>
        <input type='file' ref={refInput} onChange={HandleFile}></input>
        <button onClick={ShowFile}>Click</button>
    </div>
    
  )
}

export default Upload