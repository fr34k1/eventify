

import {Router} from 'express';
import EventController from '../controllers/event';
import validate from '../middlewares/validation/event'; 

const router = Router({strict:true});

//console.log(validate)
//console.log(validations)

router.all("*",function(req,res,next){
    //pa tota cochinas ruñas
    
    res.locals.username="chango"
    next()
})

router
.route("/create")
.get((req,res,next)=>{
    
    res.render("index.html")
})
.post(
    validate.validate(validate.create),
    validate.validationMid,
    /*EventController.create,*/(req,res)=>{
    console.log(req.body)
    res.json({
        error:"Asdasd"
    })
})

router.route("/update/:id")
.get((req,res)=>{
    res.render("events/update")
})
.post(
    validate.validate(validate.update), 
    validate.validationMid,
   (req,res)=>{}
)


router.route("/delete/:id")
.delete(
    validate.validate(validate.delete),
    validate.validationMid,
    (req,res)=>{}
)





export default router;