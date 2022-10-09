import React from "react";
import {useState,useEffect} from "react";
import styles from "./LookUp.module.scss";
//import {imgAnimal,Apple} from "../../assets";
//import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container , Row , Col , Form ,Table ,Card, Button} from 'react-bootstrap';
import classNames from 'classnames/bind';
import axios from "axios"
//import FuncHeader from "../../components/FuncHeader/FuncHeader";
//import AnimalBox from "../../components/AnimalBox/AnimalBox";
const cx = classNames.bind(styles);
const container = cx("search-box");
const col = cx("col");
const row = cx("row");
const form = cx("form")
const cardContainer =cx("card-container");
const img = cx("img");
const formTitle = cx("form-title")
const btn = cx("btn")
let title = "";
const CLIENT_ID = "GEUL96Gac2ER5fgV18hjH_wWWBV9tnEcMk3qXwbCjho"

/*axios
  .get(`https://api.dictionaryapi.dev/api/v2/entries/en/apple`,{
      params:{

      }
  })
  .then((res)=>{
      console.log(res.data)
  })*/


  const options = {
    method: 'GET',
    url: 'https://api.unsplash.com/search/photos',
    params: {client_id:CLIENT_ID,
             query:"apple"
                                },
  };
  
const LookUp = () => {
  const [WordState,SetWordState] =useState("apple");
  const [DataState,SetDataState] =useState()
  const [Meaning,SetMeaning] = useState("")
  const [ImageState,SetImageState] = useState("")
  console.log("Number")

  useEffect( () => {
    //CALL API DICTIONARY
    axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${WordState}`,{
      params:{

  }})
      .then((res)=>{
        SetDataState(res.data[0])
        console.log(DataState.meanings[0].definitions[0].definition)
      
  })
  .catch(err=>{console.error(err)})
  },[WordState]);
  //CALL API IMG LIBRARY
  options.params.query = WordState;
  axios.request(options).then(res => {
    SetImageState(res.data.results[0].links.download);
  }).catch(err=> {
    console.error(err);
  });


 return (
       <>
      
       <Container fluid className={container}>
       <Row className={row}>
        <Col className={col} xl={5}>
        <Card  className={cardContainer}>
      <Card.Img variant="top" src={ImageState} style={{ width: '50rem', height:"40rem"}}  />
      <Card.Body>
        <Card.Title>{DataState && DataState.word}</Card.Title>
        <Card.Text>
          Phát âm: "{DataState && DataState.phonetic}",
        </Card.Text>
          Định nghĩa "{DataState && DataState.meanings[0].definitions[0].definition}",
        <Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
        </Col>
        <Col className={col} xl={5} >
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className={formTitle}>Nhập từ</Form.Label>
          <Form.Control type="text" placeholder="apple" className={form} onChange={(e)=>{title=e.target.value}}/>
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={()=>SetWordState(title)} className={btn}>Find Word</Button>
        </Col>
       </Row>
      </Container>
       </>
 )


}
export default LookUp;