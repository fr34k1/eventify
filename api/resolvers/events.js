
import User from '../../models/user';
import _pagination from '../utils/pagination';


const resolvers ={

    myEvents:async(parent,args,context)=>{

        const {
            limit,
            page,
        } = args;
        const offset = (limit*page);
        
        const query= User.findOne({_id:context.user._id,})
        
        query.populate({path:"events",model:"Event",options:{}})
     

        const results =await query.exec();
        
   
        return {events:results.events,pagination:{}};
    },
 
 
    /**
     * get a single event
     */

    getEvent:async(parent,args,context)=>{
        
        const {id} = args;
    
        const event=await Event.findOne({_id:id})
        .select("_id title information location startsAt endsAt createAt status")

        event.totalInvitations= event.totalInvitations;

        return {
            events:event,
            pagination:{}
        }
            
    }
}

 
export default resolvers



/* 
        const totalEvents  = await User.aggregate([
            {
                $match:{
                    _id:context.user._id
                }
            },
            
            {
                $lookup:{
                    from:"events",
                    localField:"events",
                    foreignField:"_id",
                    as:"events" ,  
                    
                },
            },
            {
                $project:{
                    totalEvents:{$size:"$events"} 
                  
                }
            },            
        ]); */