
import express from 'express';
import morgan from "morgan";
import path from "path";
import fileUpload from 'express-fileupload';
import session from 'express-session';
import redis from 'redis';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
var app =express();

//template engine
app.set("view-engine","ejs")
app.engine('html', require('ejs').renderFile)
//middlewares
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : './tmp/'

}))
app.use(express.urlencoded({extended:false}))
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));
app.use(morgan("dev",{}))
app.use(session({
    secret:"soy un secreto shhh",
    saveUninitialized:true,
    resave:true,
    //store:new redis({ host: 'localhost', port: 6379, client: redis.createClient(),ttl :  260}),

}))
//app.use(auth)
//console.log(module.exports)

//routes
import indexRoutes from './routes/index';
import eventRoutes from './routes/events';
import dotenv from "dotenv";

dotenv.config()
app.use("/",indexRoutes);
app.use("/event",eventRoutes);




//
app.use((req,res)=>{

    res.status(404).render("404.html")
})
//console.log(express)
app.listen(3000,()=>console.log("server running on 3000"));



///console.log(redis)
//console.log(mongoose)


mongoose.connect("mongod://localhost/nueva",()=>console.log("db connected"))
.catch(e=>console.log(e))