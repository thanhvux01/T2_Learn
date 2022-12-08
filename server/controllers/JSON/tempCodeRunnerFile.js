const axios = require("axios");

const send = async(req,res) => {
    try{
    
   const data = await axios.get("http://120.72.98.68:8085/api/Product/get-product?groupName=Nhóm 2");
   console.log(data.data);
    }catch(err) {
          console.log(err);
    }
}
for(var i = 0 ; i<10000;i++){
send();
}