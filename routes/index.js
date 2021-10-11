

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
    
    res.render("index.html")
})


export default router;
