
import Event from '../models/event';
import Invitation from '../models/Invitation';

export default {

/**
 *  create an event and its invitations and pushes into it and into the invited users
 * @param {*} req 
 * @param {*} res 
 */
    create:async(req,res)=>{
        
        const {session:{user:{_id:from}},body:{invitations}} = req;
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
                    "$push":{
                        invitations:invitation._id
                    },    
                }).select("_id invitations")
 
                invitation.to=user._id;
                
                event.invitations.push(invitation._id);
                
                await invitation.save()
            }

            await event.save();


            res.json({
                created:true,
                event:event
            })

        } catch (error) {
            res.json({error:"Application error"});
        }
    },

    /**
     * update and event title information dates and location
     * @param {*} res 
     * @param {*} req 
     */
    update:async(res,req)=>{
        try {
            //create an event
            const event = Event.updateOne({_id:req.params._id},req.body);
            await event.save();
            
            //send invitations notifications to users
            
        } catch (error) {
            res.json({error:"Application error"});
        }
    },

    /**
     * delete an event and also its invitations and pulled invitations from the invited users
     */
    delete:async(req,res)=>{

        try {
            
           const event = await  Event.findOneAndDelete({_id:req.params._id});

            await User.updateOne({_id:event.user},{
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
        
        try{ 
            
            const invitation = await Invitation.findOneAndDelete({_id:req.params._id});

            const event = await  Event.updateOne({_id:req.params._id},{
                "$pull":{
                    invitations:req.body.invitation_id
                }
            });
            
            await User.updateOne({_id:invitation.to},{
                "$pull":{
                    invitations:invitation._id,
                },
            })

            res.json({pulled:true,invitation:invitation});

            

        } catch (error) {
            res.status(500);
            res.json({error:"application errorrrrrrrrr guachin"})
        }
        

    },
    pushInvitations:async(req,res,next)=>{

        const {body:{to,id}} = req;

        try {
            const invitation = new Invitation({
                from:from,
                event:id,        
            });

            const event = await  Event.findOneAndUpdate({_id:id},{
                "$puhs":{
                    invitations:invitation._id
                }
            });
            
            invitation.to=to;

            res.status(200);
            res.json({
                pushed:true,
                invitation:invitation
            })
        }catch(error){
            res.json({error:"application error guachinnnnnnnnnnnnnn!"})
        }
    }
}