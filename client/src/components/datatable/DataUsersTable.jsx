import "./dataUserTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "./dataUserTableSource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',method : 'POST',withCredentials: true,};
const Datauserstable = () => {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const GetData = async() => {
    try{
     const listUsers = await axios.get("/user/list-users",options);
     setData(listUsers.data);
    }catch(err){
      // console.log(err);
    }
  }
  useEffect(()=>{
    GetData();
  },[])
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (value) => {
        // console.log(value);
        return (
          <div className="cellAction">
            <Link to={`/admin/users/${value.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(value.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datausertable">
      <div className="datausertableTitle">
        Add New User
        <Link to="/users/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datauserstable;
