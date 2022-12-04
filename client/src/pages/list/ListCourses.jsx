import "./listCourses.scss"
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import DataCoursesTable from "../../components/datatable/DataCoursesTable"

const ListCourses = () => {
  return (
    <div className="listUser">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataCoursesTable/>
      </div>
    </div>
  )
}

export default ListCourses