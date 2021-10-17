
import User from '../models/user';
import _pagination from './utils.js/pagination';

const parseFilter=(filter)=>{
    for (const key in filter) {
        if(!filter[key]) delete filter[key]
    }

    return filter;
}



export default {

    Query:{

        hello:(parent,args,context)=> "hello gronl",


        myEvents:async(parent,args,context)=>{
            console.log(args)
            const {limit,page} = args;
            const newPage = (limit*(page-1));

            const filter = args.filter!=undefined ?  parseFilter(args.filter) : {};
        
            //console.log(parent,args,context.user)
            const user=await User.findOne({_id:context.user._id})
            .select("_id events")
            .populate({path:"events",
            model:"Event",
            query:filter,
            select:"",
            options:{sort:"createdAt",limit:limit ? limit:10 ,skip:newPage}});

            console.log(user.events);
            
            const pagination = _pagination(newPage,user.events.length,limit)
            
            return {events:user.events,pagination};
        }
    }
}