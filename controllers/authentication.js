
import session from 'express-session';
import Event from '../models/event';
import Invitation from "../models/Invitation";
import User from '../models/user';

export default {

/**
 *  create an event and its invitations and pushes into it and into the invited users
 * @param {*} req 
 * @param {*} res 
 */
    signIn:async(req,res)=>{
        
        const {username} = req.body;

        const user =await User.findOne({username})
        .select("_id username email verify")

        session.user = user;

        res.json({
            ok:"listo bitch"
        })
        
    },
    signUp:async(req,res)=>{
        
        const {username,email,password} = req.body;
        
        
        
    },


} 