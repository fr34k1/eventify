import {Router} from 'express';

import EventController from '../controllers/event';
import validations from '../middlewares/validation/event'; 
import validate from '../middlewares/validation/validate'; 


const router = Router({strict:true});

//console.log(validate)
//console.log(validations)




router
.route("/create")
.get((req,res,next)=>{
    
    res.render("index.html")
})
.post(
    validate.validate(validations.create),
    validate.validationMid,
    EventController.create,
)



router.route("/update/:id")
.get((req,res)=>{
    res.render("events/update")
})
.put(
    validate.validate(validations.update), 
    validate.validationMid,
    EventController.update
)


router.route("/delete/:id")
.delete(
    validate.validate(validations.userEvent),
    validate.validationMid,
    EventController.delete
)


router.post("/:id/invitations/push",
    validate.validate([...validations.userEvent,...validations.to]),
    validate.validationMid,
    EventController.pushInvitations,
)


router.post("/:id/invitations/pull",
    validate.validate([...validations.userEvent,...validations.to]),
    validate.validationMid,
    EventController.pushInvitations
)




export default router;