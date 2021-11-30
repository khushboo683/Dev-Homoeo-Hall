const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const productSchema=new mongoose.Schema({
    name:{
        type:String
        
    },
    size:{
        type: String
        
    },
    price:{
        type:Number
        ,
        min:0
    },
    imageUrl1:{
        type:String
        
    },
    imageUrl2:{
        type:String
        
    },
    imageUrl3:{
        type:String
        
    },
    category:{
        type:String,
        lowercase:true
      
    },
    description:{
        type:String
        
    },
    isAvailable:{
        type:Boolean
        
    },
    showOnHomePage:{
        type:Boolean
        
    }
   
})

module.exports=mongoose.model('Product',productSchema);