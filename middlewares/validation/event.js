

import {param,check,body} from 'express-validator';
import axios from 'axios';
import User from '../../models/user';

import _Invitation from "../../models/Invitation";

import createError from 'http-errors';
//import fetch from 'node-fetch';
import opencage from "opencage-api-client";



export default {
    
    create:[
    body("title")
    .exists()
    .withMessage("the title field is required")
    .not()
    .isEmpty()
    .withMessage("Esta wea no puede estar vacia hijo de p")
    .isLength({max:50})
    .withMessage("Esta wea no puede tener mas de 50 caracteres")
    .trim(),
    
    check("information")
    
    .isLength({max:1000})
    .withMessage("Esta wea no puede tener mas de 1000 caracteres"),

    
    body("location")
    .exists()
    .withMessage("the location field is required")
    .not()
    .isEmpty()
    .withMessage("Esta wea no puede estar vacia hijo de p")

    .custom(async(val,{req})=>{

        
        const re = await opencage.geocode({q:val.geo[0]+", "+val.geo[1]});
        //comprobar que wea
        //console.log(re);
        if(!re.results.length) throw new Error("Novimo guachin");
        if(val.forward!=re.results[0].formatted) throw new Error("Tremendo error guachinnnn");
        
    }),

    body("startsAt")
    .exists()
    .withMessage("the startAt field is required")
    .not()
    .isEmpty()
    .withMessage("Esta wea no puede estar vacia hijo de p")
    
    ,
    //endsAt date validation
     body("endsAt")
    .exists()
    .withMessage("the endsAt field is required")
    .not()
    .isEmpty()
    .withMessage("Esta wea no puede estar vacia hijo de p")
    
    ,

     body("invitations")
    .exists()
    .withMessage("the invitations field is required")
    .isArray()
    .withMessage("the havet o be an array")
    
    
    ],

    update:[
        param("id")
        .exists()
        .withMessage("the endsAt field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isMongoId()
        .withMessage("no es un parametro valido guachin")
        .trim()
        .escape(),
        
        body("title")
        .exists()
        .withMessage("the title field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isLength({max:50})
        .withMessage("Esta wea no puede tener mas de 50 caracteres")
        .trim()
        .escape(),
        

        body("information")
        .isLength({max:1000})
        .withMessage("Esta wea no puede tener mas de 1000 caracteres"),

        
        body("location")
        .exists()
        .withMessage("the location field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .custom(async(val)=>{
            const re = await opencage.geocode({q:val.geo[0]+", "+val.geo[1]});
            //comprobar que wea
           // console.log(re);
            if(!re.results.length) throw new Error("Novimo guachin");
            if(val.forward!=re.results[0].formatted) throw new Error("Tremendo error guachinnnn");
            
        })
        ,

        body("startsAt")
        .exists()
        .withMessage("the startAt field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no  puede estar vacia hijo de p")
        
        ,
        //endsAt date validation
        body("endsAt")
        .exists()
        .withMessage("the endsAt field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .escape()
        ,
    ],
    
    userEvent:[ 
        param("id")
        .exists()
        .withMessage("the endsAt field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isMongoId()
        /*.withMessage("no es un parametro valido guachin")
        */
        .custom(async(id,{req})=>{
            const {session:{user:{_id:user_id}}} = req;

            const user = await User.findOne({_id:user_id,events:{$in:[id]}},{
                
            }).select("_id events")

            if(user.events.length ==0){
                throw new Error("wtf dawg!!!!!! ")
            } 
        })
    ],
     
    to:[
        body("to")
        .exists()
        .withMessage("the endsAt field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isMongoId()
        .custom(async(val,{req})=>{

            const to = await User.findOne({_id:val}).select("_id")

            if(to._id==undefined) throw new Error("This user doestn Exists !!! craps!");
            
            req.body.to=to._id;
        })
        .custom(async(val,{req})=>{
            const {params:{id}} = req;
            //console.log(_Invitation)
            console.log(id,val)
            const inv = await _Invitation.findOne({event:id,to:val})
            console.log(inv)
            if(inv._id!=undefined) throw new Error("Wtf dawg!! this user is already invited");
        }) 
        
    ]  
};
 
 

