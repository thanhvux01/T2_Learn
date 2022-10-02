import React from "react";
import {useState,useEffect} from "react";
import {imgAnimal} from "../../assets";
import { Container , Row , Col ,   } from 'react-bootstrap';
import styles from "./animalboxStyles.module.scss"
import classNames from "classnames";
const cx = classNames.bind(styles);
const container = cx("search-box");
const col = cx("col");
const row = cx("row");

let i = 0;
const AnimalBox = () => {
    const [AnimalState,setAnimalState] = useState(imgAnimal[0]);
    useEffect(()=>{
        console.log("run");
      const timerID =  setInterval(()=>{
              if(i<imgAnimal.length){
              setAnimalState(imgAnimal[i])
              i++;
              } else if(i===imgAnimal.length){
                    i= 0;
                    setAnimalState(imgAnimal[i])
        
              }
    
             
          },2000)
          return () => clearInterval(timerID)
  
      
         
    },[])
  
   return (
         <>
          <Container fluid className={container}>
              <Row className={row}>
                    <Col xl={4} className={col}>
                          <h1>{AnimalState.Name}</h1>
                         <img alt="animal" src={AnimalState.src}/>
                    </Col>
                    <Col xl={5} className={col}>
                         
                    </Col>
              </Row>
          </Container>
         </>
   )
}
export default AnimalBox;