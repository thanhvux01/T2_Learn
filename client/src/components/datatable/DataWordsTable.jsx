import "./dataWordTable.scss";
import React , {useEffect} from "react";
import { DataGrid } from "@mui/x-data-grid";
import { wordColumns, wordRows } from "./dataWordTableSource";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
const options = {baseURL: 'http://localhost:5000/api',withCredentials: true,};
const Datawordstable = () => {
  const [data, setData] = useState(wordRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const GetData = async() => {
    try{
     const listUsers = await axios.get("/tuvung/list-words",options);
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
        console.log(value);
        return (
          <div className="cellAction">
            <Link to={`/admin/words/${value.row.name}`} style={{ textDecoration: "none" }}>
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
    <div className="datawordtable">
      <div className="datawordtableTitle">
        Add New Word
        <Link to="/words/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={wordColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row)=>row.meaning}
      />
    </div>
  );
};

export default Datawordstable;
