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
    EventController.create,
)


router.route("/update/:id")
.get((req,res)=>{
    res.render("events/update")
})
.put(
    validate.validate(validate.update), 
    validate.validationMid,
    EventController.update
)


router.route("/delete/:id")
.delete(
    validate.validate(validate.delete),
    validate.validationMid,
    EventController.delete
)





export default router;