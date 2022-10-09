import { Button , Container , Row , Col ,   } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from "./homeStyles.module.scss";
import {Earth,Fox,Glass} from "../../assets";
import HomeContain from '../../components/HomeContain/HomeContain';
import Header from '../../components/Header/Header';
var cx = classNames.bind(styles);
const col = cx('col')
const row = cx('row')
const container = cx('container')
const funcbar = cx('funcbar')
const btn= cx('btn')

function Home() {
  let navigate = useNavigate();
    return(
   <>
        <Header/>
        <Container fluid className={container}>
          <Row className={row}>
            <Col xl={4} className={col}>
              <img alt="Earth" src={Earth}></img>
            </Col>
            <Col xl={6} className={col}>
            <h1> Website học tiếng anh số một dành cho trẻ </h1>
            <Button className={btn} onClick={()=>navigate("/login")}>Đăng nhập</Button>
            <Button onClick={()=>{
              navigate("/register");
            }} className={btn} style={{"marginTop": "25px","backgroundColor":"#1F4B82","boxShadow":"0px 3px #183C68",}}>Đăng ký</Button>
            </Col>
          </Row>
          <Row className={funcbar}>
          </Row>
        </Container>
      <HomeContain image={Fox} title="Website học ngôn ngữ thiết kế cho trẻ" content="Nhiều trò chơi thú vị , cùng gói từ vựng thiết kế riêng cho trẻ đảm bảo được sự hứng thú của trẻ khi học tiếng anh"/>
      <HomeContain image={Glass} title="Tìm kiếm từ vựng"/>
      </>
    )
}

export default Home;