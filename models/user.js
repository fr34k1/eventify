

import {Schema,model} from 'mongoose';


const User = new Schema({
    username:{
        type:String,
    },
    password_hash:{
        type:String
    },
    email:{
        type:String
    },
    invitations:[{
        type:Schema.Types.ObjectId,
        ref:"Invitation"
    }],
    notifications:[{
        type:String,
        title:String,
        description:String
    }]

},{timestamps:true})
//console.log(User);
//console.log(Schema);

export default model("User",User); 