import "./listLessons.scss"
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import DataLessonsTable from "../../components/datatable/DataLessonsTable"

const ListLessons = () => {
  return (
    <div className="listLesson">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataLessonsTable/>
      </div>
    </div>
  )
}

export default ListLessons