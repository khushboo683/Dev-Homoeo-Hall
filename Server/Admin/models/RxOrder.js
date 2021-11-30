const mongoose=require('mongoose');
const Userreg=require('../../User/models/userreg');
const Rx= require('../../User/models/Rx');
const Schema=mongoose.Schema;

const RxOrderSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Userreg'
    },
    idRef:String,
    Rx:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Rx'
    },
    date:{
        type:String,
        default:Date(Date.now()).toString().substr(0,15)
            },
            amount:{
                type:Number,
                default:0
            },
            rxStatus:{
                type:Boolean,
                default:false
            },
            cancel:{
                type:Boolean,
                default:false
            }
    
})
const RxOrder=mongoose.model('RxOrder',RxOrderSchema);
module.exports=RxOrder;