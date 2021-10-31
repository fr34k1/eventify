
import {validationResult} from 'express-validator';

export default {
    validationMid:async(req,res,next)=>{
        //title validation
        const errors = validationResult(req).array({onlyFirstError:true});
       
        if(errors.length){
         console.log(errors)
            return res.json(errors);
        }  
        next()
    },

validate:(validations)=>{
    return async (req,res,next)=>{

        for(let validation of validations){
            
            //console.log(validation) 
            const result = await validation.run(req);

            if(result.errors.length) continue;
        }

            next();
        } 
    }
}