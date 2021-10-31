

import {Schema,model} from 'mongoose';
import bcrypt from 'bcrypt';
import { buildClientSchema } from 'graphql';

const User = new Schema({
    username:{
        type:String,
        unique:true,
    },
    password_hash:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    events:[{
        type:Schema.Types.ObjectId,
        ref:"Event"
    }],
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


User.virtual("totalEvents").get(function(){
    return this.events.length
})

User.pre("save",async function(next){

    console.log("guachin!!!")
    this.password = await bcrypt.hash(this.password,10);
    next()
})
 

User.methods.comparePasswords=async function(password){
    return await bcrypt.compare(password,this.password)
}


export default model("User",User);  