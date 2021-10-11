

import {Schema,model} from 'mongoose';


const Userr = new Schema({
    username:{
        type:String,
    },
    password_hash:{
        type:String
    },
    email:{
        type:String
    }
},{timestamps:true})


export default model();