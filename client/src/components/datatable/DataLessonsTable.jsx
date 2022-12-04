import "./dataLessonTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { lessonColumns, lessonRows } from "./dataLessonTableSource";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const Datalessonstable = () => {
  const [data, setData] = useState(lessonRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const GetData = async() => {
    try{
     const listLesson = await axios.get("/khoahoc/list-lesson",options);
     setData(listLesson.data);
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
            <Link to={`/admin/lessons/${value.row.id}`} style={{ textDecoration: "none" }}>
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
    <div className="datalessontable">
      <div className="datalessontableTitle">
        Add New Lesson
        <Link to="/lessons/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={lessonColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datalessonstable;
