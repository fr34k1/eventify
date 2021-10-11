


import {Schema,model, SchemaTypes} from 'mongoose';


const Event = new Schema({
    title:{
        type:String,
    },
    infomation:{
        type:String
    },
    invitations:[{
        type:Schema.Types.ObjectId,
        ref:"Invitation"
    }],
    location:{
        Country:String,
        State:String,
        city:String,
        address:String
    },
    startsAt:{
        type:Date
    },
    endsAt:{
        type:Date
    },
    state:{
        type:String,
        enum:["progress","canceled","finished"]
    }
},{timestamps:true})


export default model(Event,"Event");