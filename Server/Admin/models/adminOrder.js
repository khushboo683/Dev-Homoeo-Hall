const mongoose=require('mongoose');
 const Userreg=require('../../User/models/userreg');
const Schema=mongoose.Schema;


const adminOrderSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Userreg'
    },
    id:String,
    cart:[
        {
         productid:String,
         name:String,
         qty:Number,
         price:Number,
         category:String,
         imageUrl1:String,
         imageUrl2:String,
         imageUrl3:String,
         description:String
           
        }
          
    ],
    date:{
        type:String,
        default:Date(Date.now()).toString().substr(0,15)
    },
    orderStatus:{
        type:Boolean,
        default: false
    },
    cancel:{
        type:Boolean,
        default:false
    }
       
   
})

module.exports=mongoose.model('adminOrder',adminOrderSchema)