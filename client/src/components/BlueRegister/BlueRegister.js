import React from 'react'
import styles from './BlueRegister.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const container = cx("container");
const popup = cx("popup");
const top = cx("top");
const bottom = cx("bottom");
const title = cx("title");
const button = cx("button");
const close = cx("close");


const BlueRegister = () => {
  const Navigate = useNavigate();
  const GoToLogin = async () => {
       Navigate("/login")
  } 
  return (
    <div className={container}>
        <span className={popup}>
          <span className={top}>
            <span>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
          </span>
          <span className={bottom}>
            <span className={title}>Register Succesfully</span>
            <span className={button} onClick={GoToLogin}>Confirm</span>
          </span>
          <span className={close}>
              <FontAwesomeIcon icon={faXmark} onClick={GoToLogin}/>
             </span>
        </span>
    </div>
  )
  }

export default BlueRegister