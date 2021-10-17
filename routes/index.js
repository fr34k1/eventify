import {Router} from 'express';
const router = Router({strict:true});

router.all("*",function(req,res,next){
    //pa tota cochinas ruñas
    
    res.locals.username="chango"
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
