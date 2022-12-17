import React, { useRef, useState } from 'react'
import styles from './EditFlashcard.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';
import { TextField,Button } from '@mui/material';
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const cx = classNames.bind(styles);
const popup = cx("popup");
const top = cx("top");
const bottom = cx("bottom");
const title = cx("title");
const button = cx("button");
const close = cx("close");
const container = cx("container");
const btnUpload = cx("btn-upload");
const EditFlashcard = ({ShowEdit,word}) => {
  let img;
  const [Note,SetNote] = useState("");
  const Edit = async () =>{
     try{
      
      await axios.post("/tuvung/update-card",{note:Note,word:word},options);
      if(img){
        const formData = new FormData();
        formData.append("img",img);
        formData.append("word",word);
        await axios.post("/transfer/upload-iflashcard",formData,options);
        }
      ShowEdit();
     }catch(err){
        console.log(err);
     }
  }
  const UpdatePicture = (event) => {
    try{
      img = event.target.files[0];
    }catch(err){
      console.log(err)
    }
}
  return (
    <div className={container}>
    <span className={popup}>
      <span className={top}>
      <TextField label="Chú thích" color="primary" focused style={{width:"200px"}} onChange={(e)=>{SetNote(e.target.value)}}/>
      <Button variant="contained" component="label" className={btnUpload}>
             Upload
         <input hidden accept="image/*" multiple type="file" onChange={UpdatePicture} />
    </Button>
      </span>
      <span className={bottom}>
        <span className={title}>Xác nhận chỉnh sửa : {word}</span>
        <span className={button} onClick={Edit}>Chấp nhận</span>
      </span>
      <span className={close}>
          <FontAwesomeIcon icon={faXmark} onClick={ShowEdit}/>
         </span>
    </span>
</div>
  )
}

export default EditFlashcard