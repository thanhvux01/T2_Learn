export const lessonColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "lesson",
      headerName: "Lesson",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.lessonname}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "Describe",
      width: 250,
    },
  
    {
      field: "numberOfQuestion",
      headerName: "Question",
      width: 200,
    },
  ];
  
  //temporary data
  export const lessonRows = [
    {
      id: 1,
      lessonname: "Unit 1",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      status: "vocabulary-pronunciation",
      describle: "Domestic animals",
      question: 10,
    },
    {
      id: 2,
      lessonname: "Unit 2",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Wild animals",
      status: "vocabulary-pronunciation",
      question: 10,
    },
    {
      id: 3,
      lessonname: "Unit 3",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Weather",
      status: "vocabulary-pronunciation",
      question: 10,
    },
    {
      id: 4,
      lessonname: "Unit 4",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Insect",
      status: "vocabulary-pronunciation",
      question: 10,
    },
    {
      id: 5,
      lessonname: "Unit 5",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Subject",
      status: "vocabulary",
      question: 9,
    },
    {
      id: 6,
      lessonname: "Unit 6",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Color",
      status: "vocabulary-pronunciation",
      question: 9,
    },
    {
      id: 7,
      lessonname: "Unit 7",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Food",
      status: "pronunciation",
      question: 10,
    },
    {
      id: 8,
      lessonname: "Unit 8",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      describle: "Number",
      status: "vocabulary",
      question: 9,
    },
  ];
  