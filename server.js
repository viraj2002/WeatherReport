require('dotenv').config({ path: 'config.env' });
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const https=require("https");



app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){

  const query=req.body.cityname;
  const apikey=process.env.API_KEY;
  const units="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
  https.get(url,function(response){
  response.on("data",function(data){
    const weatherData=JSON.parse(data);
    const temp=weatherData.main.temp;
    const weatherdescription=weatherData.weather[0].description;
  res.write("<table border=20 size=20 style=margin-left:500;>");
  res.write("<tr><td>Property</td><td>Values</td></tr>");
  res.write("<tr><td>Temperature</td><td>"+temp+" &degC</td></tr>");
  res.write("<tr><td>Weather Description</td><td>"+weatherdescription+"</td></tr>");
  res.write("</table>");
  res.send();
  });
});

});


app.listen(3000,function(req,res){
  console.log("Server started on port 3000");
});
