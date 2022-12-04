import React from "react";
import {useState,useEffect ,useRef} from "react";
import styles from "./LoginBox.module.scss"
import classNames from "classnames/bind";
import {useNavigate} from "react-router-dom"
import { Container,Row,Col ,Form, Button} from "react-bootstrap";
import {fbicon,ggicon} from "../../assets/index"
import axios from "axios";
const cx = classNames.bind(styles);
const loginBox = cx("login-box")
const row = cx("row")
const col = cx("col")
const formLogin = cx("form-login");
const formInput = cx("form-input")
const password = cx("password")
const btn = cx("btn")
const slash = cx("slash")
const narrow = cx("narrow")
const fb = cx("fb");
const google = cx("google");
const loginBy = cx("login-by")
const alert = cx("alert");
const LoginBox = () => {
    const [UserName,SetUserName] = useState("");
    const [Password,SetPassword] = useState("");
    const usernameRef = useRef();
    const passwordRef = useRef();
    const alertRef = useRef();
    const navigate = useNavigate();
    useEffect(()=>{
      alertRef.current.style.display = "none";
    },[])
    console.log(UserName)
    const Login = (e) => {
        e.preventDefault();
        axios
        .post('http://localhost:5000/api/auth/login',{
               username:UserName,
               password:Password,
               
        }, { withCredentials: true })
        .then(res=> {
           if(res.data.error){
           passwordRef.current.style.marginBottom = "10px"; 
           alertRef.current.style.display = "initial";
           } 
           else{
            navigate("/auth");
           }
         })  
        .catch(err=>console.log(err))
    }
    return (
       <>
         <Container className={loginBox} fluid >
            <Row className={row}>
                 <Col className={col} xl={4} >
                    <h1>Log in</h1>
                    <Form className={formLogin} onSubmit={Login}>
                    <Form.Control required type="text" placeholder="Type your username" className={formInput} onChange={(e)=>SetUserName(e.target.value)} ref={usernameRef}></Form.Control>
                    <Form.Control required type="password" placeholder="Type your password" className={[formInput,password]} onChange={(e)=>SetPassword(e.target.value)} ref={passwordRef}></Form.Control>
                    <Form.Text className={alert}  ref={alertRef}>
                     Tài khoản hoặc mật khẩu của bạn không đúng
                    </Form.Text>
                    <Button className={btn} type="submit">LOG IN</Button>
                    </Form>
                    <div className={slash}>
                         <div className={narrow}></div>
                         <h4>OR</h4>
                         <div className={narrow}></div>
                    </div>
                    <div className={loginBy}>
                   
                    <Button className={[btn,fb]}>  <img alt="fb" src={fbicon}/> Facebook</Button>
                    <Button className={[btn,google]}>  <img alt="google" src={ggicon}/> Google</Button>
                    </div>
                 </Col>
                
            </Row>
         </Container>
       </>
    )
}

export default LoginBox;