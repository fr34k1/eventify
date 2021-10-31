
import Event from '../../models/event';
import _pagination from '../utils/pagination';
import User from '../../models/user';



const resolvers ={
    myInvitations:async(parent,args,context)=>{
       
        const {
            limit,
            page,
        } = args;
        
        const offset = (limit*page);
        
        const query= User.findOne({_id:context.user._id,})
        
        query.populate({path:"invitations",model:"Invitation",options:{}})
      
        const results =await user.exec();
    
        return {invitations:results.invitations,pagination:{}};
    },
 
    getEventInvitations:async(parent,args,context)=>{
        
        const {
            id,
            limit,
            page,
            filter,
            sort
        }=args
        
        const _filter  = !filter ? {} : filter;
        const _sort =!sort ?{} :sort;

        const event = await Event.findOne({_id:id})
        .populate({
            path:"invitations",
            model:"Invitation",
            options:{
                limit:limit,
                skip:(page-1)*limit,
                sort:_sort,
                query:_filter
            },
            populate:[
                {
                    path:"from",
                    model:"User",
                    select:"_id username"
                },{
                    path:"to",
                    model:"User",
                    select:"_id username"
                }
            ]
        })
        
        let totalDocs = event.totalInvitations;
        let totalPages =1;
        if(!filter){
            totalPages=totalDocs>limit ? Math.ceil(totalDocs/limit) : 1;
        }else{
            totalPages= event.invitations.length;
        }

        return {
            invitation:event.invitations,
            pagination:{
                total:totalDocs,
                page:page,
                totalPages:totalPages,
                hasNext:page<totalPages,
                hasPrev:page>1,
                
            }
        }
        
    },
 


    /**
     * get a single event
     */
}

 
export default resolvers

