const User = require("../models/User");
const Daily = require("../models/Daily")

const DateOfNow = () => {
    const date = new Date();
    const currentDate = date.getUTCDate();
    const currentMonth = date.getUTCMonth() + 1;
    const currentYear = date.getUTCFullYear();
    return new Date(currentYear + "-" + currentMonth + "-" + currentDate);
}

const GetDailyAnswer = async (req,res) => {
    try{
        const currentDate = DateOfNow();
        const id = req.user.id;
        const daily = await Daily.findOne({userID:id,date:currentDate})
        if(daily){
        const {total,date,exp} = daily;
        res.status(200).send({total,date,exp});
        }
        else{
            res.status(404).send("Not found");
        }
    }catch(err){
         console.log(err);
    }
}

const CheckDaily = async(req,res) => {
    try{
        const id = req.user.id;
        const {total} = req.body;
        const date = new Date();
        const currentDate = date.getUTCDate();
        const currentMonth = date.getUTCMonth() + 1;
        const currentYear = date.getUTCFullYear();
        const handledDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate);
        const checkExist = await Daily.findOne({"userID":id,
        "date":handledDate,})
        if(!checkExist){
        const daily = new Daily({
          "userID":id,
          "date":handledDate,
          "total":total,
        })
        await daily.save();
       }else{
        checkExist.total += total;  
        await checkExist.save();
       }
        res.status(200).send("Success");
    }catch(err){
         console.log(err);
    }
}

const UpdateStatis = async (req,res) => {
    try{
        const id = req.user.id;
        const {exp,coin,correct,total} = req.body;
        const date = new Date();
        const currentDate = date.getUTCDate();
        const currentMonth = date.getUTCMonth() + 1;
        const currentYear = date.getUTCFullYear();
        const handledDate = new Date(currentYear + "-" + currentMonth + "-" + currentDate);
       
        const user = await User.findOne({"_id":id});
        user.exp += parseInt(exp);
        user.coin +=  parseInt(coin);
        user.accuracy = {  
           "correct":user.accuracy["correct"]+parseInt(correct),
          "total":user.accuracy["total"]+parseInt(total),
        }
        let exist = false;
        user.daily.forEach((item,index)=>{
          if(item.date.toDateString() == handledDate.toDateString()){
            user.daily[index].total += parseInt(total);
            exist = true;
          }
        })
        
        !exist && user.daily.push({"date":handledDate,"total":parseInt(total)});
        await user.save();
        res.status(200).send("Success");
    }catch(err){
        console.log(err);
        res.status(400).send("error");
           
    }

  
  }
  const CheckDailyReward = async (req,res) => {
     try{
       const id = req.user.id;
       const date = DateOfNow();
       const daily = await Daily.findOne({"userID":id,"date":date});
       const user = await User.findOne({"userID":id});
       if(daily.total < 9) {
        res.send("Not Enough");
       }else
       {
        if(daily.reward == false){
         daily.reward = true;
        user.coin += 500;
        await daily.save();
        await user.save();
        res.send("Complete");
        }
        else{
         
          res.send("Complete");
        }
       }
      
     }
     catch(err){

     }

  }

  module.exports = {UpdateStatis,GetDailyAnswer,CheckDaily,CheckDailyReward};