const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User= require('./userreg');


// const imageSchema=new Schema({
    
// })
const userOrderSchema=new Schema({
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
        default:false
    },
    cancel:{
        type:Boolean,
        default:false
    }
    // deliveryTime:Number
})
module.exports=mongoose.model('userOrder',userOrderSchema);