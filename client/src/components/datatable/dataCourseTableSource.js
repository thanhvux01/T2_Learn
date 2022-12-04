export const courseColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "course",
      headerName: "Course",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.image} alt="avatar" />
            {params.row.coursename}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Describe",
      width: 230,
    },
  
    {
      field: "name",
      headerName: "Name",
      width: 100,
    },
    {
      field: "price",
      headerName: "Price",
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
  export const courseRows = [
    {
      id: 1,
      coursename: "Advance course 1",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "medium",
      describle: "Relative Clause",
      timeline: "12 Unit",
      price: "50.000vnd"
    },
    {
      id: 2,
      coursename: "Advance course 2",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Passive Voice",
      status: "medium",
      timeline: "8 Unit",
      price: "20.000vnd"
    },
    {
      id: 3,
      coursename: "Advance course 3",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Linking Verb",
      status: "easy",
      timeline: "3 Unit",
      price: "12.000vnd"
    },
    {
      id: 4,
      coursename: "Advance course 4",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Word Family",
      status: "hard",
      timeline: "33 Unit",
      price: "110.000vnd"
    },
    {
      id: 5,
      coursename: "Advance course 5",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Wish Clause",
      status: "medium",
      timeline: "8 Unit",
      price: "20.000vnd"
    },
    {
      id: 6,
      coursename: "Advance course 6",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Pronunciation",
      status: "medium",
      timeline: "14 Unit",
      price: "65.000vnd"
    },
    {
      id: 7,
      coursename: "Advance course 7",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Simple present tense",
      status: "hard",
      timeline: "20 Unit",
      price: "70.000vnd"
    },
    {
      id: 8,
      coursename: "Advance course 8",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Past present tense",
      status: "hard",
      timeline: "25 Unit",
      price: "85.000vnd"
    },
    {
      id: 9,
      coursename: "Advance course 9",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Future present tense",
      status: "hard",
      timeline: "23 Unit",
      price: "82.000vnd"
    },
  ];
  