import React , {useState,useEffect, useRef}from 'react'
import {Container,Row,Col,Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './EditProfile.module.scss'
import classNames from 'classnames/bind';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import BluePopup from '../../components/BluePopup/BluePopup';
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen , faFire} from '@fortawesome/free-solid-svg-icons';
import Avatar from '../../assets/avatar';
const cx = classNames.bind(styles);
const avatar = cx("avatar");
const sideBar= cx("side-bar");
const navBar = cx("nav-bar");
const content = cx("content");
const title = cx("title");
const upload = cx("upload");
const contain = cx("contain");
const text = cx("text");
const uploadContent = cx("upload-content");
const btnUpload = cx("btn-upload")
const note = cx("note");
const name = cx("name");
const input = cx("input");
const form = cx("form");
const btnSend = cx("btn-send");
const left = cx("left");
const right = cx("right");
const info = cx("info");
const edit = cx("edit");
const popupAvatar1 = cx("popup-avatar1");
const popupAvatar2 = cx("popup-avatar2");
const popupAvatar3 = cx("popup-avatar3");
const popupAvatar4 = cx("popup-avatar4");
const leftFooter = cx("left-footer");




const options = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
}
const sideBarconfig = {
  "learning":false,
  "flashcard":false,
  "search":false,
  "story":false,
 }

const EditProfile = () => {
    let img;
    const navigate = useNavigate();
    const popupImage = useRef(true);
    const [PopupConfirm,SetPopupConfirm] = useState(false);
    const refName = useRef() , refEmail = useRef() , refBirthday = useRef() , refImage = useRef();
    const refPopup1 = useRef() , refPopup2 = useRef() , refPopup3 = useRef() , refPopup4 = useRef() ;
    const [UserInformation,SetUserInformation] = useState({});
    const GetData = async () => {
      try{
      const user_data = await axios.get("/auth/find",options);
      user_data && SetUserInformation(user_data.data);  
     
      }
      catch(err){
       if(err.response.data.status=401)
       navigate("/login");
      }  
     }
     const BindingValue = () => {
      try{
       refName.current.value = UserInformation.fullname;
       refEmail.current.value = UserInformation.email;
       refBirthday.current.value = UserInformation.birthday;
       
      }catch(err){
        console.log(err);
      }
     }
     const Transition = () => {
           if(popupImage.current){

           refPopup2.current.className = popupAvatar2;
           refPopup3.current.className = popupAvatar3;
           refPopup4.current.className = popupAvatar4;   

           }else{

            refPopup2.current.className = popupAvatar1;
            refPopup3.current.className = popupAvatar1;
            refPopup4.current.className = popupAvatar1;     

           } 
           popupImage.current = !popupImage.current;
           
     }
     const Update = async () => {
           try{
               const userDataObj = {
                  fullname:refName.current.value,
                  email:refEmail.current.value,
                  birthday:refBirthday.current.value,
                  image:refImage.current.src,
               }   
              
               UserInformation.fullname = refName.current.value;
               UserInformation.email = refEmail.current.value;
               UserInformation.birthday = refBirthday.current.value;
            
              await axios.post("/user/update-by-user",userDataObj,options);
              if(img){
              const formData = new FormData();
              formData.append("avatar",img)
              await axios.post("/transfer/upload-avatar",formData,options);
              }
              ShowPopup();
           }catch(err){
                console.log(err);
           }
     }
     const UpdatePicture = async (event) => {
           try{
             img = event.target.files[0];
             refImage.current.src = URL.createObjectURL(img);
             UserInformation.image = refImage.current.src
           }catch(err){
             console.log(err)
           }
     }
     const UpdateDefaultPicture = (event) => {
         try{
          refImage.current.src = event.target.src;
          UserInformation.image = refImage.current.src
         }catch(err){
          console.log(err)
         }
     }
    const ShowPopup = () => {
           SetPopupConfirm(!PopupConfirm);
    }
     useEffect(()=>{
      GetData();
   },[])
   useEffect(()=>{
    BindingValue();
   })
  return (
    <Container fluid>
    <Row>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig} /></Col>
     <Col md={10} className={navBar}>
      <NavBar />
      <Row className={content}>
      
       <span className={title}>Tài khoản</span>
       <Row className={info}>
       <div className={left}>
       <span className={contain}>
       <span className={upload}>
           <span className={text}>Ảnh đại diện</span>
           <span className={uploadContent}>
              <label className={btnUpload}>Chọn tập tin
               <Form.Control type="file" style={{display:"none"}} accept="image/*" onChange={UpdatePicture}/>
              </label>
              <span className={note}>Kích thước ảnh tối đa 1 mb</span>
           </span>
       </span>
       <span className={name}>
       <span className={text}>Họ và tên</span>
       <span className={input}>
       <Form.Control type="text" className={form} ref={refName} />
       </span>
       </span>
       <span className={name}>
       <span className={text}>Email</span>
       <span className={input}>
       <Form.Control type="email" className={form} ref={refEmail} />
       </span>
       </span>
       <span className={name}>
       <span className={text}>Ngày sinh</span>
       <span className={input}>
       <Form.Control required type="date" className={form} ref={refBirthday}/>
       </span>
       </span>
       <div  className={leftFooter}> <span className={btnSend} onClick={Update} >Thay đổi</span> </div>
       </span>
       </div>
       <div className={right}>
       <span className={avatar}>
           <img src={[UserInformation.image]} ref={refImage}/>
           <span className={edit} onClick={Transition}> <FontAwesomeIcon icon={faPen}/></span>
           <span className={popupAvatar1}  ref={refPopup1} >
             <img src={Avatar["elephant"]} onClick={UpdateDefaultPicture}/>
           </span>
           <span className={popupAvatar1}  ref={refPopup2} onClick={UpdateDefaultPicture} >
             <img src={Avatar["lion"]} />
           </span>
           <span className={popupAvatar1} ref={refPopup3} onClick={UpdateDefaultPicture} >
             <img src={Avatar["hippo"]} />
           </span>
           <span className={popupAvatar1} ref={refPopup4} onClick={UpdateDefaultPicture} >
             <img src={Avatar["default"]}  />
           </span>
          </span>         
       </div>
       </Row>
      </Row>
     </Col>
     {PopupConfirm && <BluePopup ShowPopup={ShowPopup}/>}
    </Row>
   </Container>
  )
}

export default EditProfile