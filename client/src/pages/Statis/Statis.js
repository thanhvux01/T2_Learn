import React,{useEffect, useState} from "react";
import styles from './Statis.module.scss'
import {Container,Row,Col} from 'react-bootstrap';
import classNames from 'classnames/bind';
import SideBar from "../../components/SideBar/SideBar";
import NavBar from "../../components/NavBar/NavBar";
import UserBox from "../../components/UserBox/UserBox";
import UserBar from "../../components/UserBar/UserBar";
import axios from "axios";
const cx = classNames.bind(styles);
const sideBar= cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const tier = cx("tier");
const below = cx("below");
const expand =  cx("expand");
const column = cx("column");
const describe = cx("describe");
const options = {
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
}
const sideBarconfig = {
  "learning":false,
  "flashcard":false,
  "search":false,
  "story":false,
  "statis": true,
 }

const Statis = () => {
  const [Data,SetData] = useState([]);
  const GetData = async () => {
    try{
    const data =  await axios.get("/user/ranking-exp",options);
    SetData(data.data);
   
    }catch(err){
         console.log(err);
    }
  }
  useEffect(()=>{
    GetData();
  },[])
  return (
    <Container fluid>
    <Row>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig} /></Col>
     <Col md={10} className={navBar}>
      <NavBar/>
      <div className={main}>
          <div className={tier}>
             {/* <UserBox rank="2" exp="1600" name="Khathi"/>
             <UserBox rank="1" exp="2000" name="Thanh11" />
             <UserBox rank="3" exp="1200" name="Bu"/> */}
           {Data[1] && <UserBox rank="2" exp={Data[1].exp} name={Data[1].fullname} img={Data[1].image}/>}
           {Data[0] && <UserBox rank="1" exp={Data[0].exp} name={Data[0].fullname} img={Data[0].image}/>}
           {Data[2] && <UserBox rank="3" exp={Data[2].exp} name={Data[2].fullname} img={Data[2].image}/>}
          </div>
        
          <div className={below}>  
            <span className={expand} >More User</span>
            <span className={column}>
               <span className={describe}>
               <span>Người dùng</span>
                <span>Tổng kinh nghiệm</span>
                <span>Tỉ lệ chính xác </span>
                <span>Tổng số câu</span>
               </span>
            </span>
           {Data && Data.slice(3,9).map((item,i)=>{
               return <UserBar rank={i+4} name={item.fullname} email={item.email} exp={item.exp} accuracy={item.accuracy}/>
           })} 
          </div>
      </div>
     </Col>
    </Row>
   </Container>
  )
}

export default Statis;