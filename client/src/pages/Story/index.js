import React,{useState,useEffect,useRef} from 'react';
import styles from './Story.module.scss';
import classNames from 'classnames/bind';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import {Container,Row,Col} from 'react-bootstrap';
import Alert from '../../components/Alert/Alert';
import StoryBox from '../../components/StoryBox/StoryBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const config = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const content = cx("content");
const category = cx("category")
const imgContent = cx("img-content");
const imgCard = cx("img-card");

const sideBarconfig = {
  "learning":false,
  "flashcard":false,
  "search":false,
  "story":true,
  "statis":false,
 }
const Story = () => {
    const chilrenRef = useRef([]);
    
    
       const nagivate = useNavigate();
       const [BuyIndex,SetBuyIndex] = useState();
       const [Nav,SetNav] = useState(true);
       const [ShowAlert,SetAlert] = useState(false);
       const [AlertData,SetAlertData] = useState();
       const [Course,SetCourse] = useState(true);
       const [UserInformation,SetUserInformation] = useState({"username":"","email":"","coin":0,"exp":0});
       const [DataStories,SetDataStories] = useState([]);
       const GetUserData = async () => {
         try{
         const user_data = await axios.get("/auth/find",config);
         user_data && SetUserInformation({"username":user_data.data.username,"email":user_data.data.email,"exp":user_data.data.exp,"coin":user_data.data.coin});

        }
         catch(err){
          if(err.response.data.status=401)
          nagivate("/login");
         }  
        };
        const GetStory = async () => {
          const story = await axios.get("/stories/get-stories",config);
          story["data"] && SetDataStories(story["data"]);
          
        }
        useEffect(()=>{
          GetUserData();
          GetStory();
        },[BuyIndex]) 
          //  useEffect(()=>{
          //   // console.log(chilrenRef.current);
          //  })
           const ConfirmBuy = async (storyID) => {
            try{
              await axios.post("/stories/confirm-buy",{storyID},config);
              SetAlert(false);   
              SetCourse(false);
              SetCourse(true); 
              GetUserData();
              SetNav(false);
              SetNav(true);
              
            }catch(err){

            }
           }
           const PopUp = (index) => {
           SetBuyIndex(index);
            SetAlert(!ShowAlert);
            DisableAll();
           }
          const ShowDetail = (i) => {
            DisableAll();
            chilrenRef.current[i].style.display == "none" ? chilrenRef.current[i].style.display = "flex" : chilrenRef.current[i].style.display = "none"

           }
           const DisableAll = () => {
             chilrenRef.current.forEach((item,i)=>{ chilrenRef.current[i].style.display = "none" ;})
           }
  return (
    <Container fluid onClick={DisableAll}>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
    { Nav && <NavBar username={UserInformation.username} email={UserInformation.email} coin={UserInformation.coin} exp={UserInformation.exp}/> }

      <Row className={content}>
        
             <div className={category}> Story about animals</div>
          {Course &&  <div className={imgContent}>
             {DataStories.map((item,i)=><StoryBox key={item._id} data={item} ref={el => chilrenRef.current[i] = el} index={i} Click={ShowDetail} PopUp={PopUp}/>)}
             </div> }
             { ShowAlert && <Alert type={"buy"} data={"none"} confirm={ConfirmBuy}  story={DataStories[BuyIndex]} />}
      </Row>
     </Col>
    </Row>
   </Container>
  )
}

export default Story