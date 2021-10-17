


import {Schema,model, SchemaTypes} from 'mongoose';


const Event = new Schema({
    title:{
        type:String,
        max:50,
        min:3,
        unique:true,
        required:true,
    },
    infomation:{
        type:String,
        max:1000,
    },
    invitations:[{
        type:Schema.Types.ObjectId,
        ref:"Invitation"
    }],
    location:{
        type:String
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


export default model("Event",Event);