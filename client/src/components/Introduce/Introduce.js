import React from 'react'
import styles from './Introduce.module.scss'
import classNames from 'classnames/bind';
import GuideImage from '../../assets/guide';
const cx = classNames.bind(styles);
const introduce = cx("introduce");
const describe = cx("describe");
const content = cx("content");
const Introduce = (prop) => {
  const {courseID} = prop;
  if(courseID==0){
  return (
    <span className={introduce}>
        <span className={content}>
            <img src={GuideImage["1"]}/>
            <span className={describe}>
                <span>Hướng dẫn bài Unit 1</span>
                <span>Tìm hiểu từ vựng về chủ đề động vật và môi trường</span>
            </span>
         </span>
         </span>
         
  )
  }
}

export default Introduce