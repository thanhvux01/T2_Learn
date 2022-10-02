import {FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCaretDown} from "@fortawesome/free-solid-svg-icons"
import classNames from 'classnames/bind';
import styles from "./headerStyles.module.scss";
import {Logo} from "../../assets";
const cx = classNames.bind(styles);
const header = cx('header')
const divLogo = cx('logo')
const changeLanguage = cx('changeLanguage')

const Header = () => {
 return (
    <div className={header}>
    <div className={divLogo}>
        <img alt="Logo"src={Logo}></img>
        <div className={changeLanguage}>
         <h1>Thay đổi ngôn ngữ: Tiếng việt
         <FontAwesomeIcon icon={faCaretDown} ></FontAwesomeIcon>
         </h1>
    </div>
    </div>
  </div>
 )

}
export default Header;