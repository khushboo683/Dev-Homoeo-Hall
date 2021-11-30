const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Rx=require('./Rx');
const userOrder=require('./userOrder');
const Product =require('../../Admin/models/product');

//Defining Schema for our user reg database

const userRegisterSchema = new Schema({
    name: String,
    
    password: String,
  
    address:String,
    mobile:String,
    pincode:String,
    cart:[{
        productId:{
            type:String
        },
productQty:{
   type: Number,
   default:1
}

    }
        
    ],
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
       ref:'Product'
    }],
    Rx:[{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Rx'
    } 
    ],
    Myorders:[
        {
       
        type:mongoose.Schema.Types.ObjectId,
        ref:'userOrder'
            }],
   
   
});
const Userreg = mongoose.model('Userreg', userRegisterSchema);
module.exports = Userreg;