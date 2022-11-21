import React ,{useState,useEffect,useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Search.module.scss'
import classNames from 'classnames/bind';
import {Container,Row,Col,Button,Table} from 'react-bootstrap';
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ImgHover from '../../components/ImgHover/ImgHover';
import Confirm from '../../components/Confirm/Confirm';
import axios from 'axios';
const cx = classNames.bind(styles);
const sideBar = cx("side-bar");
const navBar = cx("nav-bar");
const main = cx("main");
const content = cx("content");
const flexImage = cx("flex-image");
const column = cx("column");
const searchBar = cx("search-bar");
const input = cx("input");
const title = cx("title");
const btn = cx("btn");
const table = cx("table");
const CLIENT_ID = "GEUL96Gac2ER5fgV18hjH_wWWBV9tnEcMk3qXwbCjho";
const sideBarconfig = {
    "learning":false,
    "flashcard":false,
    "search":true,
    "story":false,
    "statis":false,
   }
   const apiConfigimage = {
    method: 'GET',
    url: 'https://api.unsplash.com/search/photos',
    params: {client_id:CLIENT_ID,
             query:"cat"
                                },
  };
  const apiConfigword = {
    method: 'GET',
    url: 'https://api.dictionaryapi.dev/api/v2/entries/en/cat',
  };
  const Translate = {
    baseURL: 'http://localhost:5000/api/tuvung',
    withCredentials:true, 
  };
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
 const SearchPage = () => {
    const inputRef = useRef();
    const imgConfirm = useRef();
    const [ConfirmInit,SetConfirmInit] = useState(false);
    const navigate = useNavigate();
    const [UserInformation,SetUserInformation] = useState({"username":"","email":"","coin":0,"exp":0});
     const [ListImage,SetListImage] = useState([]);
    const [Meaning,SetMeaning] = useState("");
    const [Word,SetWord] = useState("");
    const ConfirmBox =  (data) => {
        imgConfirm.current = data;
        SetConfirmInit(!ConfirmInit);
    };
    const GetUserData = async () => {
        try{
        const user_data = await axios.get("/auth/find",options);
        user_data && SetUserInformation({"username":user_data.data.username,"email":user_data.data.email,"exp":user_data.data.exp,"coin":user_data.data.coin});

      }
        catch(err){
         if(err.response.data.status=401)
         navigate("/login");
        }  
       };
       useEffect(()=>{
        GetUserData();
       },[])
    const GetData = async () => {
      try{
        if(inputRef.current.value){
        apiConfigimage.params["query"] = inputRef.current.value;
        apiConfigword.url = "https://api.dictionaryapi.dev/api/v2/entries/en/"+ inputRef.current.value;
        }
      const Image = await axios.request(apiConfigimage);
      const Word = await axios.request(apiConfigword);
      const translated = await axios.post("/translate",{text:inputRef.current.value},Translate);
      translated && SetMeaning(translated.data[0].translatedText);
      Image && SetListImage(Image.data.results);
      Word && SetWord(Word.data[0]);
      }
      catch(err){
      
      }
    }
       useEffect(()=>{
        inputRef.current.value = "Cat";
        GetData();
       },[])
  return (
    <Container fluid>
    <Row className={main}>
     <Col md={2} className={sideBar}><SideBar config={sideBarconfig}/></Col>
     <Col md={10} className={navBar}>
       
     <NavBar username={UserInformation.username} email={UserInformation.email} coin={UserInformation.coin} exp={UserInformation.exp}/>
       
      <Row className={content}>
        <div className={flexImage}>
        { ListImage[0] &&
          <div className={[column]}>
           
            
             <ImgHover src={ListImage[0].urls["regular"]} width={"40%"} height={"30%"} Click={ConfirmBox}/>
             <ImgHover src={ListImage[1].urls["regular"]} width={"60%"} height={"30%"} Click={ConfirmBox}/>
             <ImgHover src={ListImage[2].urls["regular"]} width={"80%"} height={"40%"} Click={ConfirmBox}/>
             <ImgHover src={ListImage[3].urls["regular"]} width={"20%"} height={"40%"} Click={ConfirmBox}/>
             <ImgHover src={ListImage[4].urls["regular"]} width={"100%"} height={"30%"} Click={ConfirmBox} />
          
          
        </div>
        }
         { ListImage[0] &&
        <div className={column}>
        
                
             <ImgHover src={ListImage[5].urls["regular"]} width={"60%"} height={"30%"} Click={ConfirmBox} />
             <ImgHover src={ListImage[6].urls["regular"]} width={"40%"} height={"30%"} Click={ConfirmBox}/>
             <ImgHover src={ListImage[7].urls["regular"]} width={"100%"} height={"40%"} Click={ConfirmBox}/>
             <ImgHover src={ListImage[8].urls["regular"]} width={"30%"} height={"30%"} Click={ConfirmBox} />
             <ImgHover src={ListImage[9].urls["regular"]} width={"70%"} height={"30%"}  Click={ConfirmBox}/>
        
          
        </div>
        }
        </div>
        <div className={table}>
          { Word["word"] &&
        <Table striped bordered hover size="sm">
      <tbody>
        <tr>
          <td>1</td>
          <td>Từ</td>
          <td>{Word.word}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Nghĩa</td>
          <td>{Meaning}</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Loại từ</td>
          <td>{Word.meanings[0].partOfSpeech}</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Mô tả</td>
          <td>{Word.meanings[0].definitions[0].definition}</td>
        </tr>
        <tr>
          <td>4</td>
          <td>Phát âm</td>
          <td>{Word.phonetic}</td>
        </tr>
      </tbody>
    </Table>
   }
        </div>
    
        <div className={searchBar}>
              <span className={title}>Tra từ</span>
              <span className={input}>
                <input ref={inputRef}></input>
                <Button className={btn} onClick={GetData}><FontAwesomeIcon icon={faMagnifyingGlass}/></Button>
              </span>
        </div>
        { ConfirmInit && <Confirm src={imgConfirm.current} data={{Word,Meaning}} Click={ConfirmBox} /> }
      </Row>
     </Col>  
    </Row>
   </Container>
  )
}

export default SearchPage;
