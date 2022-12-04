import "./dataCourseTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { courseColumns, courseRows } from "./dataCourseTableSource";
import { Link } from "react-router-dom";
import { useState } from "react";
import React,{useEffect} from "react";
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const Datacoursestable = () => {
  const [data, setData] = useState(courseRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const GetData = async() => {
    try{
     const listCourses = await axios.get("/khoahoc/list-course",options);
     setData(listCourses.data);
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
        return (
          <div className="cellAction">
            <Link to={`/admin/courses/${value.id}`} style={{ textDecoration: "none" }}>
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
    <div className="datacoursetable">
      <div className="datacoursetableTitle">
        Add New Course
        <Link to="/courses/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={courseColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datacoursestable;
