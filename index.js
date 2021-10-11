
import express from 'express';
import morgan from "morgan";
import path from "path";
var app =express();



//template engine
app.set("view-engine","ejs")
app.engine('html', require('ejs').renderFile)
//middlewares
app.use(express.urlencoded({extended:true}))
//app.use(express.static(path.join(__dirname,"public")));
app.use(morgan("dev",{}))
app.use(express.json());


//console.log(module.exports)

//routes
import indexRoutes from './routes/index';

app.use("/",indexRoutes);




//
app.use((req,res)=>{

    res.status(404).render("404.html")
})
//console.log(express)
app.listen(3000,()=>console.log("server running on 3000"));


