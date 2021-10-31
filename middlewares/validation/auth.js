
import {param,check,body,validationResult} from 'express-validator';


export default {

    authRequired:(req,res,next)=>{
        
        if(req.session.user == undefined) {
            
            if(req.headers["Content-Type"] == "application/json"){

                return res.status(401).json({error:"you have to be authenticated"})
            }

            return res.redirect("/auth/signin");
        }
        next()
    },

    noAuthRequired:(req,res,next)=>{
        if(req.session.user != undefined) {
            
            if(req.headers["Content-Type"] == "application/json"){

                return res.status(401).json({error:"you are already auhtenticated"})
            }

            return res.redirect("/");
        }
        next()
    },
    verifiedRequired:(req,res,next)=>{
        if(!req.session.user.verified ){
            
            if(req.headers["Content-Type"] == "application/json"){

                return res.status(401).json({error:"you are already auhtenticated"})
            }

            return res.redirect("/verify/false");
        }
        next()
    },
    signin:[
        body("username")
        .exists()
        .withMessage("the title field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isLength({max:50})
        .withMessage("Esta wea no puede tener mas de 50 caracteres")
        .trim()
        .custom(async(val,{req})=>{
            
            const user =await User.findOne({username:val})
            .select("_id username")
            
            if(!user.username) throw new Error("Credecnciales Incorrectas")
            
        }),
        
        body("password")
        .exists()
        .withMessage("the location field is required")
        .not()
        .isEmpty()
        .withMessage("Esta wea no puede estar vacia hijo de p")
        .isLength({max:200})
        .withMessage("Esta wea no puede tener mas de 50 caracteres")
        .custom(async(val,{req:{username}})=>{
            const filter={};
            if(username.match(/@/)) filter.email = username;

            else filter.username = username;

            const user =await User.findOne(filter)
            .select("_id username password")
            
            if(!User.comparePasswords(val,user.password)) throw new Error("Credecnciales Incorrectas")
            
        }),
        
        ],
        signUp:[
            body("username")
            .exists()
            .withMessage("the title field is required")
            .not()
            .isEmpty()
            .withMessage("Esta wea no puede estar vacia hijo de p")
            .isLength({max:50})
            .withMessage("Esta wea no puede tener mas de 50 caracteres")
            .trim()
            .custom(async(val,{req})=>{
                
                const user =await User.findOne({username:val})
                .select("_id username")
                
                if(user.username) throw new Error("this Username is already taken bitch")
                
            }),
            body("email")
            .exists()
            .withMessage("the title field is required")
            .not()
            .isEmpty()
            .withMessage("Esta wea no puede estar vacia hijo de p")
            .isLength({max:50})
            .withMessage("Esta wea no puede tener mas de 50 caracteres")
            .trim()
            .isEmail()
            .withMessage("Esta wea tiene que ser un email valido weon")
            .custom(async(val,{req})=>{
                
                const user =await User.findOne({email:val})
                .select("_id username")
                
                if(user.username) throw new Error("this email is already taken bitch")
                
            }),
            body("password")
            .exists()
            .withMessage("the location field is required")
            .not()
            .isEmpty()
            .withMessage("Esta wea no puede estar vacia hijo de p")
            .isLength({max:200})
            .withMessage("Esta wea no puede tener mas de 50 caracteres")
            .custom(async(val,{req:{username}})=>{
                const filter={};
                if(username.match(/@/)) filter.email = username;
    
                else filter.username = username;
    
                const user =await User.findOne(filter)
                .select("_id username password")
                
                if(!User.comparePasswords(val,user.password)) throw new Error("Credecnciales Incorrectas")
                
            }),
            
            ]

}