
import Event from '../models/event';
import Invitation from "../models/Invitation";
import User from '../models/user';
export default {

/**
 *  create an event and its invitations and pushes into it and into the invited users
 * @param {*} req 
 * @param {*} res 
 */
    create:async(req,res)=>{
        
        const {session:{user:{_id:from}},body:{invitations}} = req;
        console.log(from)
        try {
            
            //create an event
            const event = new Event(req.body);
            
            event.invitations=[]
            //push invitations notifications to users
            
            for(let user_id of invitations){

                const invitation = new Invitation({
                    from:from,
                    event:event._id,
                });

                const user = await User.findOneAndUpdate({_id:user_id},{
                    $push:{
                        invitations:invitation._id
                    },    
                }).select("_id invitations")
 
                invitation.to=user._id;
                
                event.invitations.push(invitation._id);
                
                await invitation.save()
            }

            await event.save();

            await User.updateOne({_id:from},{
                $push:{
                    events:event._id
                }
            })

            res.json({
                created:true,
                event:event
            })

        } catch (error) {
            console.log(error)
            res.json({error:"Application error"});
        }
    },

    /**
     * update and event title information dates and location
     * @param {*} res 
     * @param {*} req 
     */
    update:async(req,res)=>{
        
        try {
            //create an event
            await Event.updateOne({_id:req.params.id},req.body);         
            //send invitations notifications to users
            res.json({
                updated:true,
                
            })
        } catch (error) {
            res.json({error:"Application error"});
        }
    },

    /**
     * delete an event and also its invitations and pulled invitations from the invited users
     */
    delete:async(req,res)=>{

        const {session:{user}} = req;

        try {
            console.log(req.params)
           const event = await  Event.findOneAndDelete({_id:req.params.id});

            await User.updateOne({_id:user._id},{
                "$pull":{
                    events:event._id
                }
            })

            event.invitations.forEach(async(inv)=>{
                const invitation =await Invitation.findOneAndDelete({_id:inv})
                await User.updateOne({_id:invitation.to},{
                    "$pull":{
                        invitations:invitation._id,
                    },
                })
            })

           res.json({
               delete:true,
               event:event
           })
        } catch (error) {
            console.log(error)
           res.json({error:"Application error"}) 
        }
    },

    /**
     *  pull and invitation from the event and from the invited user
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    pullInvitations:async(req,res,next)=>{
        
        const {params:{id:event_id},body:{id:invitation_id}} = req;
        try{ 
            
            const invitation = await Invitation.findOneAndDelete({_id:invitation_id});

            const event = await  Event.updateOne({_id:event_id},{
                "$pull":{
                    invitations:invitation_id
                }
            });
            
            await User.updateOne({_id:invitation.to},{
                "$pull":{
                    invitations:invitation_id,
                },
            })

            res.json({pulled:true,invitation:invitation});

        } catch (error) {
            console.log(error)
            res.status(500);
            res.json({error:"application error guachin"})
        }
        

    },
    pushInvitations:async(req,res,next)=>{

        const {body:{to},params:{id},session:{user:{_id:from}}} = req;
        console.log(Invitation);
        try {
            const invitation = new Invitation({
                from:from,
                event:id,        
            });

            const event = await  Event.findOneAndUpdate({_id:id},{
                $push:{
                    invitations:invitation._id
                } 
            });
   
            invitation.to = to;

            await invitation.save();
            
            res.status(200);
            res.json({
                pushed:true,
                invitation:invitation
            })
        }catch(error){
            console.log(error)
            console.log("ASdasdasd")
            res.json({error:"application error guachinnnnnnnnnnnnnn!"})
        }
    }
} 