import "./listUsers.scss"
import {default as Sidebar} from '../../components/SideBar/SideBarAdmin';
import {default as Navbar} from '../../components/NavBar/NavBarAdmin';
import DataUsersTable from "../../components/datatable/DataUsersTable"

const ListUsers = () => {
  return (
    <div className="listUser">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <DataUsersTable/>
      </div>
    </div>
  )
}

export default ListUsers