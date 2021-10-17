

import {param,check,body,validationResult} from 'express-validator';
import axios from 'axios';
import User from '../../models/user';
import createError from 'http-errors';
//import fetch from 'node-fetch';
import opencage from "opencage-api-client";


const validate = validations=>{
    return async (req,res,next)=>{

        for(let validation of validations){
            
            //console.log(validation) 
            const result = await validation.run(req);

            if(result.errors.length) continue;
        }

        next();
    } 
}

export default {validate:validate,
    
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

    body("startAt")
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
    validationMid:async(req,res,next)=>{
        //title validation
        const errors = validationResult(req).array({onlyFirstError:true});
       
        if(errors.length){
         console.log(errors)
            return res.json(errors);
        }  
        next()
    },

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

        body("startAt")
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
    delete:[
        param("id")
        .exists()
        .withMessage("the endsAt field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isMongoId()
        .withMessage("no es un parametro valido guachin")
    ]
    
};
 
 

