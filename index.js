const express=require("express");
const app=express();
const users=[{
  name: "harkirat",
kidneys:[{
  healthy:false
}]
}];
app.use(express.json());

app.get("/",function(req,res){
  const johnKidneys=users[0].kidneys;
  console.log(johnKidneys)
  const numberOfKidneys =johnKidneys.length;
  // filter for no. of helthy kidneys LEARN
  let numberOfHealthyKidneys=0;
  for(let i=0;i<johnKidneys.length;i++){

if(johnKidneys[i].healthy){  
    numberOfHealthyKidneys=numberOfHealthyKidneys+1;
}  }

const numberOfUnHealthyKidneys=numberOfKidneys-numberOfHealthyKidneys;

res.json({
  numberOfKidneys,
  numberOfHealthyKidneys,
  numberOfUnHealthyKidneys
})
})

app.post("/",function(req,res){

     const isHealthy = req.body.isHealthy;
     users[0].kidneys.push({
      healthy:isHealthy
     })
     res.json({
      msg:"DONE!"
     });
})

app.put("/",function(req,res){
  for(let i=0;i<users[0].kidneys.length;i++){
    users[0].kidneys[i].healthy = false; 
  }
  res.json({

  });
})

app.delete("/",function(req,res){
  // only if atleast one bad or unhealthy kidney is there do this ,else rreturn 411
 if(isThereAtLeastOneUnHealthy() ){
  
  const newKidneys=[]
       for(let i=0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy){
          newKidneys.push({
            healthy:true
          })
        }
       }
       users[0].kidneys =newKidneys;
       res.json({msg:"done"})
      }
      else{
        res.status(411).json({
            msg:"You have no bad kidney"
        })
      }
}) 

function isThereAtLeastOneUnHealthy(){
  let atleastOneUnHealthy =false;
  for(let i=0;i<users[0].kidneys.length;i++){
      if(!users[0].kidneys[i].healthy){
        atleastOneUnHealthy=true;
      }
  }
  return atleastOneUnHealthy;
}
app.listen(3000);