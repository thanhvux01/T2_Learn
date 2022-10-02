import React from "react";
import { Container , Row , Col , Form ,Button  } from 'react-bootstrap';
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./registerboxStyles.module.scss";
import axios from "axios";
const cx = classNames.bind(styles);
const registerBox = cx("register-box")
const row = cx("row");
const col = cx("col");
const formEmail = cx("form-email")
const formPassword =cx("form-password")
const formName = cx("form-name")
const formBirthday = cx("form-birthday");
const btn = cx("btn");
const inputEmail = cx("input-email")
const inputPassword = cx("input-password")
const inputName = cx("input-name")
const inputDate = cx("input-date")


const RegisterBox = () => {
      const PostData=(e) => {
            e.preventDefault();
            axios.post('http://localhost:5000/dangky/store',{
                 name: NameState,
                 email: EmailState,
                 password: PasswordState,
                 birthday: BirthdayState,
            })
            .then(res=> console.log(res))
            .catch(err=>console.log(err))
      }
      
      const [NameState,SetNameState] = useState("");
      const [PasswordState,SetPasswordState] = useState("");
      const [EmailState,SetEmailState] = useState("");
      const [BirthdayState,SetBirthdayState] = useState("");

      return (
         <Container fluid className={registerBox}>
         <Row className={row}>
               <Col className={col} xl={3}>
                  <h1>Tạo tài khoản</h1>
                  <Form>
                  <Form.Group className={formEmail} controlId="FormEmail">
                  <Form.Label>Địa chỉ Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" className={inputEmail}  onChange={(e)=>SetEmailState(e.target.value)}/>
                 </Form.Group>
                 
                  <Form.Group className={formPassword} controlId="FormPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" className={inputPassword} onChange={(e)=>SetPasswordState(e.target.value)} />
                  </Form.Group>

                  <Form.Group className={formName} controlId="FormName">
                  <Form.Label>Họ Tên</Form.Label>
                 <Form.Control type="text" className={inputName} onChange={(e)=>SetNameState(e.target.value)}/>
                 </Form.Group>
                 <Form.Group className={formBirthday} controlId="FormDate">
                  <Form.Label>Ngày Sinh</Form.Label>
                 <Form.Control type="date" className={inputDate} onChange={(e)=>SetBirthdayState(e.target.value)} />
                 </Form.Group>
                 <Button className={btn} type="submit" onClick={PostData}>Đăng ký</Button>
                 
                  </Form>
                
               </Col>
         </Row>
         </Container>

      )

}

export default RegisterBox;