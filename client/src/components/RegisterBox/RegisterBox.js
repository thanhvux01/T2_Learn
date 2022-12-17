import React from "react";
import { Container , Row , Col , Form ,Button  } from 'react-bootstrap';
import { useState,useRef,useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./registerboxStyles.module.scss";
import axios from "axios";
import BlueRegister from "../BlueRegister/BlueRegister";
const cx = classNames.bind(styles);
const registerBox = cx("register-box")
const row = cx("row");
const col = cx("col");
const formMain = cx("form-main")
const formEmail = cx("form-email")
const formPassword =cx("form-password")
const formName = cx("form-name")
const formBirthday = cx("form-birthday");
const formUsername = cx("form-user-name")
const btn = cx("btn");
const inputEmail = cx("input-email")
const inputPassword = cx("input-password")
const inputName = cx("input-name")
const inputDate = cx("input-date")
const inputUsername = cx("input-user-name")


const RegisterBox = () => {

      const [NameState,SetNameState] = useState("");
      const [PasswordState,SetPasswordState] = useState("");
      const [EmailState,SetEmailState] = useState("");
      const [BirthdayState,SetBirthdayState] = useState("");
      const [UserNameState,SetUserNameState] = useState("");
      const [validated, setValidated] = useState(false);
      const [Popup,SetPopup] = useState(false)
      const FormRef = useRef(null);
      const PostData=(e) => {
            e.preventDefault();
            axios.post('http://localhost:5000/api/auth/register',{
                 username: UserNameState,
                 fullname: NameState,
                 email: EmailState,
                 password: PasswordState,
                 birthday: BirthdayState,
            })
            .then(res=>SetPopup(!Popup))
            .catch(err=>console.log(err))
      }
      /* const handleSubmit = (event) => {
            const form = event.currentTarget; //su kien se chay doc het cac form trong ham formain
           
            if (form.checkValidity() === false) {
            //neu checkvalidity = false thi khong cho submit 
              event.preventDefault();
              event.stopPropagation();
            }            
            
          };*/
      useEffect(() => {               
                const element = FormRef.current; //
                element.addEventListener('submit', PostData);

                return() => {
                  element.removeEventListener('submit',PostData);
                }

      }) 

          


      return (
         <Container fluid className={registerBox}>
         <Row className={row}>
               <Col className={col} xl={3}>
                  <h1>Tạo tài khoản</h1>
                  <Form className={formMain} validated={validated} ref={FormRef} >
                  <Form.Group className={formUsername}  controlId="FormUserName" onChange={(e)=>SetUserNameState(e.target.value)}>
                  <Form.Label>Tên tài khoản</Form.Label>
                 <Form.Control required type="text" className={inputUsername} onChange={(e)=>SetNameState(e.target.value)}/>
                 </Form.Group>
                  <Form.Group className={formEmail} controlId="FormEmail">
                  <Form.Label>Địa chỉ Email</Form.Label>
                  <Form.Control required type="email" placeholder="Enter email" className={inputEmail}  onChange={(e)=>SetEmailState(e.target.value)}/>
                 </Form.Group>
                  <Form.Group className={formPassword} controlId="FormPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" placeholder="Password" className={inputPassword} minLength="8" onChange={(e)=>SetPasswordState(e.target.value)} />
                  </Form.Group>
                  <Form.Group className={formName} controlId="FormName">
                  <Form.Label>Họ Tên</Form.Label>
                 <Form.Control required type="text" className={inputName} onChange={(e)=>SetNameState(e.target.value)}/>
                 </Form.Group>
                 <Form.Group className={formBirthday} controlId="FormDate">
                  <Form.Label>Ngày Sinh</Form.Label>
                 <Form.Control required type="date" className={inputDate} onChange={(e)=>SetBirthdayState(e.target.value)} />
                 </Form.Group>
                 <Button className={btn} type="submit">Đăng ký</Button>
                 
                  </Form>
                
               </Col>
               {Popup && <BlueRegister/> }
         </Row>
         </Container>

      )

}

export default RegisterBox;