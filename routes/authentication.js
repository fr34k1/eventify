import {Router} from 'express';
const router = Router({strict:true});
import User from '../models/user';

import validations from '../middlewares/validation/auth'; 
import validate from '../middlewares/validation/validate'; 

import authenticationController from '../controllers/authentication';
/* 
router.all("*",async function(req,res,next){
    //pa tota cochinas ruñas
    req.session.user = await User.findOne({username:"geof"});  
    res.locals.user=req.session.user;
    next()
}) */



router
.route("/signin")
.get(validations.noAuthRequired,(req,res,next)=>{
    console.log(req.body);
    res.render("index.html")
})
.post(
    validations.noAuthRequired,
    validate.validate(validations.create),
    validate.validationMid,
    authenticationController.signIn,
)


router
.route("/signup")
.get(validations.noAuthRequired,(req,res,next)=>{
    console.log(req.body);
    res.render("index.html")
})
.post(
    validations.noAuthRequired,
    validate.validate(validations.create),
    validate.validationMid,
    authenticationController.signUp
)


router
.route("/varify/:key")
.get((req,res)=>{
    
})


router
.route("/recover")
.get((req,res)=>{
    res.send("bitchhhhhhhhhh")
})


export default router;
