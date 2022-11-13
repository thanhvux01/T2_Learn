import React, { useRef,forwardRef} from 'react'
import styles from './StoryBox.module.scss'
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Story from '../../assets/story';
const cx = classNames.bind(styles);
const imgCard = cx("img-card");
const detail = cx("detail-box")
const title = cx("title");
const length = cx("length");
const level = cx("difficult");
const btn = cx("btn");
const background = cx("background");
const StoryBox = (prop,ref) => {
  const Navigate = useNavigate();
  const {title,difficult,content} = prop.data;
  const {index,Click} = prop;
  
//   const detailRef = useRef();

  return (
    <div className={imgCard} onClick={(e)=>{
        e.stopPropagation();
        Click(index)}}>
                <span>Fox</span>
                <img src={Story.Fox} ></img>       
                <span className={detail} ref={ref}>
                  <span className={title}>{title}</span>
                  <span className={length}>Độ dài : <span>1000 từ</span></span>
                  <span className={level}>Độ khó: <span>{difficult}</span></span>
                  <span className={btn} onClick={(e)=>{
                    e.stopPropagation();
                    Navigate("/reading",{state:{content:content,title:title}});
                  }}>Đọc</span>
                  <span className={background} style={{backgroundImage:`url(${Story.Background})`}}></span>
                </span>  
        
            
     </div>
  )
}

export default forwardRef(StoryBox);