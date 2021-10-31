import {Router} from 'express';
const router = Router({strict:true});
import User from '../models/user';

router.all("*",async function(req,res,next){
    //pa tota cochinas ruñas
    
    
    
    req.session.user = await User.findOne({username:"geof"});  
    res.locals.user=req.session.user;
    next()
})

router
.route("/")
.get((req,res,next)=>{
    
    
    console.log(req.body);
    res.render("index.html")
})
.post((req,res,next)=>{ 
    
    console.log(req.body);
    res.json({error:"asdasd"})
})



export default router;
