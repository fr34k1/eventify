


import {Schema,model, SchemaTypes} from 'mongoose';


const Invitation = new Schema({
    to:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    from:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    event:{
        type:Schema.Types.ObjectId,
        ref:"Event"
    },
    state:{
        type:String,
        enum:["progress","canceled","confirmed"],
        default:"progress"
    }
},{timestamps:true})


export default model(Invitation,"Invitation");