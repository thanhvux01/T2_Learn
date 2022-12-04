import React from 'react';
import "./LessonPopUp.scss";
import { useRef,useEffect} from 'react';
import {Form,InputGroup} from 'react-bootstrap';
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const LessonPopUp = ({ShowPopUp,lessonID}) => {
 
  const refWord1 = useRef(), refWord2 = useRef(), refWord3 = useRef();
  const refType = useRef(), refMeaning = useRef(), refResult = useRef();
  const AddQuestion = async () => {
     try{  
           const data = {
                type:refType.current.value,
                lessonID,
                word1:refWord1.current.value,
                word2:refWord2.current.value,
                word3:refWord3.current.value,
                meaning:refMeaning.current.value,
                result:refResult.current.value,
              }
           
         await axios.post("/khoahoc/add-question",data,options)
     }catch(err){
           console.log(err);
     }
  }
  return (
    <div className='container'>
        <span className='popup'>
        <title>Thêm câu hỏi</title>
        <InputGroup className="input-container">
        <InputGroup.Text id="basic-addon">Câu 1
        </InputGroup.Text>
        <Form.Control
          placeholder="Random Default"
          aria-label="Username"
          aria-describedby="basic-addon"
          ref={refWord1}
        />
      </InputGroup>
      <InputGroup className="input-container">
        <InputGroup.Text id="basic-addon">Câu 2
        </InputGroup.Text>
        <Form.Control
          placeholder="Random Default"
          aria-label="Username"
          aria-describedby="basic-addon"
          ref={refWord2}
        />
      </InputGroup>
      <InputGroup className="input-container">
        <InputGroup.Text id="basic-addon" >Câu 3
        </InputGroup.Text>
        <Form.Control
          placeholder="Random Default"
          aria-label="Username"
          aria-describedby="basic-addon"
          ref={refWord3}
        />
      </InputGroup>
      <InputGroup className="input-container">
        <InputGroup.Text id="basic-addon" >Đáp án
        </InputGroup.Text>
        <Form.Control
          placeholder="Pig"
          aria-label="Username"
          aria-describedby="basic-addon"
          ref={refResult}
        />
      </InputGroup>
      <InputGroup className="input-container">
        <InputGroup.Text id="basic-addon" >Nghĩa
        </InputGroup.Text>
        <Form.Control
          placeholder="Heo"
          aria-label="Username"
          aria-describedby="basic-addon"
          ref={refMeaning}
        />
      </InputGroup>
      <Form.Select aria-label="Type Select" className='select' ref={refType}>
      <option>Open this select menu</option>
      <option value="vocal">Trắc nghiệm 1</option>
      <option value="vocalNoimage">Trắc nghiệm 2</option>
      <option value="pronoun">Nghe</option>
    </Form.Select>
      <div className='bottom'>
      <button onClick={AddQuestion}>Thêm</button>
      <button onClick={ShowPopUp}>Hủy</button>
      </div>     
        </span>
    </div>
  )
}

export default LessonPopUp