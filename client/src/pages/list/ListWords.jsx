import "./listWords.scss"
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import DataWordsTable from "../../components/datatable/DataWordsTable"



const ListWords = () => {
  return (
    <div className="listword">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataWordsTable/>
      </div>
    </div>
  )
}

export default ListWords