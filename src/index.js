const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require('./routes/routes.js');

app.use(express.json());


mongoose.connect("mongodb+srv://hsupare:2kZE1zdHBT5kzVVm@cluster0.5drhi.mongodb.net/citylink",{
    useNewUrlParser:true
})
.then(()=>{console.log("MongodB is connected")})
.catch((err)=>{console.log(err)})


app.use("/",route)

app.listen(3001,()=>{
    console.log("Port is listen on 3001 port")
})


