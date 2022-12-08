import React from 'react'
import styles from './BluePopup.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faXmark} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const container = cx("container");
const popup = cx("popup");
const top = cx("top");
const altTop = cx("alt-top");
const altBottom = cx("alt-bottom");
const bottom = cx("bottom");
const title = cx("title");
const button = cx("button");
const close = cx("close");


const BluePopup = ({ShowPopup,type=true}) => {
  if(type==true){
  return (
    <div className={container}>
        <span className={popup}>
          <span className={top}>
            <span>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
          </span>
          <span className={bottom}>
            <span className={title}>Update Succesfully</span>
            <span className={button} onClick={ShowPopup}>Go back</span>
          </span>
          <span className={close}>
              <FontAwesomeIcon icon={faXmark} onClick={ShowPopup}/>
             </span>
        </span>
    </div>
  )
  }else if(type == false){
    return(
    <div className={container}>
    <span className={popup}>
      <span className={altTop}>
        <span>
            <FontAwesomeIcon icon={faXmark}/>
        </span>
      </span>
      <span className={altBottom}>
        <span className={title}>Lỗi quá số từ</span>
        <span className={button} onClick={ShowPopup}>Go back</span>
      </span>
      <span className={close}>
          <FontAwesomeIcon icon={faXmark} onClick={ShowPopup}/>
         </span>
    </span>
</div>
    )
  }
}

export default BluePopup