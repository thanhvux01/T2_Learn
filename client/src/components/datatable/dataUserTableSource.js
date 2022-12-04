import react from 'react';
import axios from 'axios';
import React from 'react';

export const userColumns = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "username",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
  
    {
      field: "age",
      headerName: "Age",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  //temporary data
  export const userRows = [
    {
      id: 1,
      username: "Vu Cong Thanh",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "active",
      email: "thanh@gmail.com",
      age: 22,
    },
    {
      id: 2,
      username: "Le Viet Kha Thi",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "khathi@gmail.com",
      status: "active",
      age: 22,
    },
    {
      id: 3,
      username: "Pham Hoang Long",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "phamlong@gmail.com",
      status: "pending",
      age: 23,
    },
    {
      id: 4,
      username: "Le Hoang Long",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "hoanglong@gmail.com",
      status: "active",
      age: 16,
    },
    {
      id: 5,
      username: "Nguyen Duy Dat",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "dat@gmail.com",
      status: "passive",
      age: 22,
    },
    {
      id: 6,
      username: "Duong Thanh Phat",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "phat@gmail.com",
      status: "active",
      age: 30,
    },
    {
      id: 7,
      username: "Pham Hong Phong",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "phong@gmail.com",
      status: "passive",
      age: 34,
    },
    {
      id: 8,
      username: "Doan Quoc Bao",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "bao@gmail.com",
      status: "active",
      age: 20,
    },
    {
      id: 9,
      username: "Nguyen Chi Cuong",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "NCC@gmail.com",
      status: "pending",
      age: 29,
    },
    {
      id: 10,
      username: "Bing Chilling",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "bing@gmail.com",
      status: "active",
      age: 65,
    },
  ];
  
  /*
  class dataUserTableSource extends React.Component{
    state={
      dataUserTableSource:[]
    }
    async componentDidMount(){
      let res = await axios.get('')
      this.setState({
        dataUserTableSource:res && res.data && res.data.data ? res.data.data : []
      })
    }
    render(){
      return (
        <div className=''>
          
        </div>
      )
    }
  }
  export default dataUserTableSource */
  
  