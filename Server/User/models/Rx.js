const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const imageSchema=new Schema({
    
// })
const rxSchema=new Schema({
    url:String,
    description:String,
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
module.exports=mongoose.model('Rx',rxSchema);