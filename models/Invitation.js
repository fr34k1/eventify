


import {Schema,model, SchemaTypes} from 'mongoose';
import paginate from 'mongoose-paginate-v2';

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

//Invitation.plugin(paginate)



const invitation = model("Invitation",Invitation);
export default invitation;