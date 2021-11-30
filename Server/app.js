if(process.env.NODE_ENV!=='production'){
    require('dotenv').config();
}

const express = require('express')
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const User = require('./User/models/userreg');
const Rx=require('./User/models/Rx');
const bcrypt = require("bcrypt");
const cors = require('cors');
const Product= require('./Admin/models/product');
const{cloudinary}=require('./User/cloudinary');
const UserOrder=require('./User/models/userOrder');
const AdminOrder=require('./Admin/models/adminOrder');
const RxOrder=require('./Admin/models/RxOrder');


// const{userSchema,productSchema}=require('./schema');
const catchAsync=require('./Admin/utils/catchAsync');
const ExpressError=require('./Admin/utils/ExpressError');
const validatePhoneNumber = require('validate-phone-number-node-js');


//const requireAuth=require('./middleware/authMiddleware');
const validPins=['834001', '834002', '834003'];

const app = express()
const SECRETKEY = "laksh@123";

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
  //  useCreateIndex:true,
    useUnifiedTopology: true
})
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const db=mongoose.connection;
db.on("error", console.error.bind(console,"connection error:"));
db.once("open", ()=>{
    console.log("DATABASE CONNECTED");
})

app.get('/',(req,res)=>{
    res.send('Hii');
})


const verifyToken = (req, res, next) => {
    try {
        const bearer = req.headers.authorization;
        if (bearer) {
            const bearerToken = bearer.split(" ");
            const token = bearerToken[1];
            //  console.log(token);
            jwt.verify(token, SECRETKEY, (err, decoded) => {
                // console.log(token);
                if (err) {
                    res.json(false)
                }
                else {
                //    req.userData = decoded;
                  //console.log(decoded);
                    next();
                   
                    res.json({decoded});
                }
            });
        } else {
            res.sendStatus(403)
        }
    } catch (err) {
        console.log(err.message);
    }
}

app.post('/check', verifyToken, (req, res) => {

    // res.sendStatus(403)
    //  console.log("hi");
    //res.json(true)
})

app.post('/logout', verifyToken, (req, res) => {
    console.log("logout");
})

app.post('/register', catchAsync(async (req, res) => {
   
    User.findOne({ mobile: req.body.mobile }, (err, found) => {
       
        if (err) {
            console.log(err);
        } else {
            if (found) {
                return res.json({message:"User already exists with this mobile number"});
            } else {
                var result = validatePhoneNumber.validate(req.body.mobile);
                console.log(result)
                if(result==false){
                    return res.json({message:'Invalid mobile number'});
                }
                
                if(req.body.pincode!='834001' && req.body.pincode!='834002' && req.body.pincode!='834003' ){
                    return res.json({message:'Sorry ! Cannot deliver to this postal address :-('});
                }
                if (req.body.password.length < 6) {
                    return res.json({ message: 'Password length should be greater than 5 characters' })
                }
                else if (req.body.password != req.body.confirmPassword) {
                    return res.json({ message: 'Password doesn\'t match' });
                }
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        
                        const user = {
                            // fullname: req.body.nameuser,
                            // username: req.body.username,
                            name: req.body.name,
                            age:req.body.age,
                            
                            email:req.body.email,
                            address:req.body.address,
                            mobile:req.body.mobile,
                            pincode:req.body.pincode,
                            password: hash
                        }
                        const newUser = new User(user);
                        console.log("success");
                        newUser.save(err => {
                            if (err) {
                                console.log(err);
                            } else {

                                return res.json({ message: 'Succesfull Register' })
                            }
                        });
                    }
                });
            }
        }
    })
}))
app.post('/login', (req, res) => {
    var mobile = req.body.username;
    var password = req.body.password;
    // console.log(req.body)
    User.findOne({ mobile: mobile })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.sendStatus(403)
                    }
                    if (result) {
                        //  console.log(username);
                        token = jwt.sign({ mobile: mobile }, SECRETKEY);
                        // res.setHeader('Authorization', token);
                        console.log("login");
                        if(mobile==='8003132907')
                        {
                            token= "adminhaizinda";
                            res.json({
                                message: 'admin',
                                token
                            })
                        }
                        else{
                        res.json({
                            message: 'login',
                            token
                        })
                    }
                    } else {
                        res.json({
                            message: 'Incorrect mobile number or password'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'Incorrect mobile number or password'
                })
            }
        })
})

//admin

app.get('/admin',(req,res)=>{
    res.send('Admin Home');
})
app.get('/admin/products', catchAsync(async (req,res)=>{
    const products=await Product.find({});
    res.send(products);
}))
app.get('/admin/products/new',(req,res,next)=>{
    // res.render('/admin/products/new');
    next();
})
app.post('/admin/products',catchAsync(async (req,res)=>{
    const product = {
        name:req.body.name,
        size:req.body.size,
        price:req.body.price,
        imageUrl1:req.body.imageUrl1,
        imageUrl2:req.body.imageUrl2,
        imageUrl3:req.body.imageUrl3,
        category:req.body.category,
        description:req.body.description,
        isAvailable:req.body.isAvailable,
        showOnHomePage:req.body.showOnHomePage
    }
    const newProduct = new Product(product);
        await newProduct.save(err => {
            
            if (err) {
                console.log(err);
            } else {
                return res.json({ message: 'New Product Added' });
            }
        });
}))
// app.post('/admin/products',catchAsync(async (req,res)=>{
//     const product= new Product(req.body.product);
//         await product.save(err => {
//             console.log(req.body.product);
//             if (err) {
//                 console.log(err);
//             } else {
//                 return res.json({ message: 'New Product Added' });
//             }
//         });
        
// })
app.get('/admin/products/:id',catchAsync(async (req,res)=>{
    const{id}=req.params;
    const product=await Product.findById(id);
    // res.render('/admin/showProduct',{product});
    res.send(product);

}))
app.get('/admin/products/:id/edit',catchAsync(async(req,res)=>{
    const product= await Product.findById(req.params.id);
    // res.render('/admin/products/edit',{product});
    res.send(product);
}))
app.put('/admin/products/:id',catchAsync(async (req,res)=>{
    const {id}= req.params;
   
    const product = {
        name:req.body.name,
        size:req.body.size,
        price:req.body.price,
        imageUrl1:req.body.imageUrl1,
        imageUrl2:req.body.imageUrl2,
        imageUrl3:req.body.imageUrl3,
        category:req.body.category,
        description:req.body.description,
        isAvailable:req.body.isAvailable,
        showOnHomePage:req.body.showOnHomePage
    }
    await Product.findByIdAndUpdate(id,{...product});
    res.send("edit");
}))

app.delete('/admin/products/:id',catchAsync(async (req,res)=>{
    const{id}=req.params;
    const product=await Product.findByIdAndDelete(id);
    res.send('delete product');
}))

app.get('/admin/orders',catchAsync(async(req,res)=>{
    const orders=await AdminOrder.find({});
    res.send(orders);

}))
app.get('/admin/orders/:orderId',catchAsync(async(req,res)=>{
    const {orderId}=req.params;
    const order=await AdminOrder.findById(orderId).populate('user').exec(function(err,result){
if(err)
{
    console.log(err);
}
else {
    res.send(result);
}
    })
    
   

}))


app.put('/admin/orders/:orderId/delivered',catchAsync(async(req,res)=>{
   
    const {orderId}=req.params;
    console.log(orderId);
    const order= await AdminOrder.findByIdAndUpdate(orderId,
        {$set:{orderStatus:true}}, {safe: true, upsert: true, new : true});
        await UserOrder.findByIdAndUpdate(order.id,
            {$set:{orderStatus:true}}, {safe: true, upsert: true, new : true});
        console.log(order);
        res.send("delivered")
}))
app.put('/admin/orders/:orderId/notDelivered',catchAsync(async(req,res)=>{
    const {orderId}=req.params;
    const order= await AdminOrder.findByIdAndUpdate(orderId,
        {$set:{orderStatus:false}}, {safe: true, upsert: true, new : true});
        await UserOrder.findByIdAndUpdate(order.id,
            {$set:{orderStatus:false}}, {safe: true, upsert: true, new : true});
        
        console.log(order);
        res.send("notdelivered")
}))
app.put('/admin/orders/:orderId/cancel',catchAsync(async(req,res)=>{
    const {orderId}=req.params;
    const order= await AdminOrder.findByIdAndUpdate(orderId,
        {$set:{cancel:true}}, {safe: true, upsert: true, new : true});
        await UserOrder.findByIdAndUpdate(order.id,
            {$set:{cancel:true}}, {safe: true, upsert: true, new : true});
        // order.RX.cancel=true;
        console.log(order);
        res.send("cancel")
}))

app.put('/admin/orders/:orderId/undoCancel',catchAsync(async(req,res)=>{
    const {orderId}=req.params;
    const order= await AdminOrder.findByIdAndUpdate(orderId,
        {$set:{cancel:false}}, {safe: true, upsert: true, new : true});
        await UserOrder.findByIdAndUpdate(order.id,
            {$set:{cancel:false}}, {safe: true, upsert: true, new : true});

        // order.RX.cancel=false;
        console.log(order);
        res.send("undocancel")
}))



// *put requests of Rx:**

app.put('/admin/rx/:rxId/amount',catchAsync(async(req,res)=>{
    const {rxId}=req.params;
    console.log("check");
    console.log(rxId)
    const amount=req.body.amount;
    const order = await RxOrder.findByIdAndUpdate(rxId,
        {$set:{amount:amount}}, {safe: true, upsert: true, new : true}).populate('Rx')

        await Rx.findByIdAndUpdate(order.idRef,
            {$set:{amount:amount}}, {safe: true, upsert: true, new : true})
        // await RxOrder.findByIdAndUpdate(RxId,
        //     {$set:{Rx:{amount:req.body.amount}}}, {safe: true, upsert: true, new : true});
        
        // // order.Rx.amount=req.body.amount;

        
        //     console.log("amount changed",order);
        // console.log(order);

            res.send("amount");
        
}));







app.put('/admin/rx/:RxId/delivered',catchAsync(async(req,res)=>{
    const {RxId}=req.params;
    const order= await RxOrder.findByIdAndUpdate(RxId,
        {$set:{rxStatus:true}}, {safe: true, upsert: true, new : true}).populate('Rx');
        await Rx.findByIdAndUpdate(order.idRef,
            {$set:{rxStatus:true}}, {safe: true, upsert: true, new : true})
        // order.Rx.rxStatus=true;
        
        console.log(order);
        res.send("delivered");
}))
app.put('/admin/rx/:RxId/notDelivered',catchAsync(async(req,res)=>{
    const {RxId}=req.params;
    const order= await RxOrder.findByIdAndUpdate(RxId,
        {$set:{rxStatus:false}}, {safe: true, upsert: true, new : true}).populate('Rx');
        await Rx.findByIdAndUpdate(order.idRef,
            {$set:{rxStatus:false}}, {safe: true, upsert: true, new : true})
        // order.Rx.rxStatus=false;
        console.log(order);
        res.send("undo delivery");
}))
app.put('/admin/rx/:RxId/cancel',catchAsync(async(req,res)=>{
    const {RxId}=req.params;
    const order= await RxOrder.findByIdAndUpdate(RxId,
        {$set:{cancel:true}}, {safe: true, upsert: true, new : true}).populate('Rx');
        await Rx.findByIdAndUpdate(order.idRef,
            {$set:{cancel:true}}, {safe: true, upsert: true, new : true})
        // order.Rx.cancel=true;
        console.log(order);
        res.send("cancelled");
}))

app.put('/admin/rx/:RxId/undoCancel',catchAsync(async(req,res)=>{
    const {RxId}=req.params;
    const order= await RxOrder.findByIdAndUpdate(RxId,
        {$set:{cancel:false}}, {safe: true, upsert: true, new : true}).populate('Rx');
        await Rx.findByIdAndUpdate(order.idRef,
            {$set:{cancel:false}}, {safe: true, upsert: true, new : true})
        // order.Rx.cancel=false;
        console.log(order);
        res.send("undo cancelation");
}))





app.get('/admin/users',catchAsync(async(req,res)=>{
const users= await User.find({});
res.send(users);
}))

app.get('/admin/users/:userId',catchAsync(async(req,res)=>{
    const{userId}=req.params;
    const user=await User.findById(userId).populate('Rx').populate('Myorders').exec(function(err, result) {
        if(err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
}))

// app.delete('/admin/users/:userId/delete',catchAsync(async(req,res)=>{
//     const {userId}=req.params;
//     await User.findOneAndDelete({'mobile':userId});
    
// }))

app.get('/admin/rxes',catchAsync(async(req,res)=>{
    const rxes= await RxOrder.find({});
    res.send(rxes);
}))
app.get('/admin/rxes/:rxId',catchAsync(async(req,res)=>{
    const {rxId}=req.params;
    const rx=await RxOrder.findById(rxId).populate('user').populate('Rx').exec(function(err, result) {
        if(err){
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
}))

// * admin routes end **

app.get('/user/:userId/profile',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    const user=await User.findOne({'mobile':userId});
    res.send(user);
}))

app.get('/user/:userId/details',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    console.log(userId);
    const user=await User.findById(userId);
    console.log(user);
    res.send(user);
}))
// * user profile edit *

app.put('/user/:userId/profile/edit',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    var check=false;
    console.log("check");
    console.log(req.body);
    const user= await User.findOne({'mobile':userId});
    if(req.body.mobile && req.body.mobile!=userId){
        // var result = validatePhoneNumber.validate(req.body.mobile);
        // console.log(result)
        check=true;
        if(req.body.mobile.length!=10){
            return res.json({message:'Invalid mobile number'});
        }
        
            const anyUser=await User.findOne({'mobile':req.body.mobile});
            if(anyUser && anyUser._id!=user._id){
                return res.json({message:'Account with this mobile number already exists'});
            }
            
        }
      
    
    if(req.body.pincode){
        if(req.body.pincode!='834001' && req.body.pincode!='834002' && req.body.pincode!='834003' ){
            return res.json({message:'Sorry ! Cannot deliver to this postal address :-('});
        }
    }
    
    
   
            
            const userInfo = {
                
                name: req.body.name,
                address:req.body.address,
                mobile:req.body.mobile,
                pincode:req.body.pincode,
                
            }
            console.log(userInfo);
           const updatedUser= await User.findOneAndUpdate({'mobile':userId},{...userInfo});
            updatedUser.save(err => {
                if (err) {
                    console.log(err);
                } else {
                    if(check)return res.json({message:'Successfully changed mobile'});
                  
                    
                    return res.json({ message: 'Successfully changed your details' })
                }
            });
        

}))

// *user profile edit *


app.delete('/user/:userId/profile/delete',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    await User.findOneAndDelete({'mobile':userId});
    // console.log('Successfully deleted');
    res.send('User deleted');
}))

app.post('/user/:userId',catchAsync(async(req,res)=>{
    // console.log(req.body.Id)
   try {
       const fileStr = req.body.base64EncodedImage;
       //console.log(req.body.base64EncodedImage)
       const uploadResponse = await cloudinary.uploader.upload(fileStr, {
           upload_preset: 'dev_setups',
       });
    //    console.log(uploadResponse);
       res.json({ message: 'Prescription uploaded successfully!' });
        //1. userId
    const userId=req.body.Id;
    const user=await User.findOne({mobile:userId});
    // if(!user){
    //     console.log('error');
    // }
//     //2. description
const rx={
    description:req.body.description,
    // date:Date.now(),
    url:uploadResponse.url

}
console.log(rx)
const newRx=new Rx(rx);
await newRx.save();    
user.Rx.push(newRx);
await user.save();
const newRxOrder=new RxOrder({user:user,Rx:newRx,idRef:newRx._id});
// console.log("successfully saved new Rx order",newRxOrder);
await newRxOrder.save();
   } catch (err) {
       console.error(err);
       res.status(500).json({ err: 'Something went wrong' });
   }
  
  


}))

app.put('/user/:userId/add-to-cart/:prodId',catchAsync(async(req,res)=>{
    const{userId,prodId}=req.params;
    // console.log(userId)
    // console.log(prodId)
   const user= await User.findOneAndUpdate(
    { "mobile" : userId },
        {$push: {"cart": {productId: prodId, productQty: 1}}},
        {safe: true, upsert: true, new : true}
        ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: err,
              });
            }
            res.json(result);
               
        });
    
    // console.log(user);
}))

app.put('/user/:userId/remove-from-cart/:prodId',catchAsync(async(req,res)=>{
    const{userId,prodId}=req.params;
   const user= await User.findOneAndUpdate(
    { "mobile" : userId },
        { $pull: { cart: { productId: prodId } } },
        {safe: true, upsert: true, new : true}
   ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(result);
       
});
    // console.log(user);
}))

app.get('/user/:userId/wishlist',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    const user=await User.findOne({'mobile':userId}).populate('wishlist');
    res.send(user.wishlist); 
}))

app.put('/user/:userId/add-to-wishlist/:prodId',catchAsync(async(req,res)=>{
    const{userId,prodId}=req.params;
    const product= await Product.findById(prodId);
    const user= await User.findOneAndUpdate(
        { "mobile" : userId },
            {$push: {"wishlist": product}},
            {safe: true, upsert: true, new : true}
            ).exec((err, result) => {
                if (err) {
                  return res.status(400).json({
                    error: err,
                  });
                }
                res.json(result);
                   
            });
   
}))


app.put('/user/:userId/remove-from-wishlist/:prodId',catchAsync(async(req,res)=>{
    const{userId,prodId}=req.params;
    console.log(userId);
    console.log(prodId);
// const product= await Product.findById(prodId);
   const user= await User.findOneAndUpdate(
    { "mobile" : userId },
        { $pull: { "wishlist": prodId } },
        {safe: true, upsert: true, new : true}
   ).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    
    res.json(result);
       
});
    
}))

app.get('/user/:userId/cart',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    console.log(userId)
    const user=await User.findOne({'mobile':userId});
    // console.log(user.cart);

    res.send(user.cart);
}))

app.get('/user/:prodId',catchAsync(async(req,res)=>{
    const {prodId}=req.params;
    const product=await Product.findById(prodId);
    res.send(product);
}))
app.put('/user/:userId/cart/clearCart',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    const user=await User.findOneAndUpdate({"mobile":userId},
    {"$set": {"cart": []}},
    {safe: true, upsert: true, new : true}
    );
    // user.cart=[];
    console.log(user);
    
}))

app.put('/user/:userId/cart/increase/:prodId',catchAsync(async(req,res)=>{
    const{userId,prodId}=req.params;
    const user= await User.findOneAndUpdate(
        { "mobile" : userId,"cart.productId": prodId },
        { $inc: { "cart.$.productQty" : 1 } },
        { new: true }
    )
    // console.log(user);
    //   ).exec((err, result) => {
    //     if (err) {
    //       return res.status(400).json({
    //         error: err,
    //       });
    //     }
    //     res.json(result);
    //   });
    
    
}))
app.put('/user/:userId/cart/decrease/:prodId',catchAsync(async(req,res)=>{
    const{userId,prodId}=req.params;
    const user= await User.findOneAndUpdate(
        { "mobile" : userId,"cart.productId": prodId },
        { $inc: { "cart.$.productQty" : -1 } },
        { new: true }
    )
    // console.log(user);
    
    
}))
// app.get('/user/:userId/cart/checkout/confirm',(req,res)=>{
// // res.send('Order Confirmed');
// console.log('ORDER CONFIRMED!!!!')
// })

app.post('/user/:userId/cart/checkout/confirm',catchAsync(async(req,res)=>{
    // console.log("cart dekho neeche")
    //  console.log(req.body)
     console.log("check0")
   const {userId}=req.params;
   const user=await User.findOne({'mobile':userId});
//    console.log("check1",user)

var Cart=[];
   for(let item of req.body){
    var newCart={
        productid:item._id,
        name:item.name,
        size:item.size,
        price:item.price,
        qty:item.qty, 
        imageUrl1:item.img_url,
        imageUrl2:item.img_url2,
        imageUrl3:item.img_url3,
        category:item.category,
        description:item.description,
            
           }
           Cart.push(newCart);


   }
//    console.log(Cart)
   const order=new UserOrder({cart:Cart});
   await order.save();
   const adminOrder=new AdminOrder({cart:Cart,user:user,id:order._id});
   
 console.log("adminOrder save successfull",adminOrder);
   await adminOrder.save();
//    console.log("successful",order);
 user.Myorders.push(order);
 console.log(user)
 await user.save(err=>{
     if(err){
         console.log(err);
     }
     return res.json({message:"Successful"});
 }
 );
 console.log("User save successful");


  
//    user.orders.push(order);
//     console.log(user);
// console.log("check2")
//    await user.save();
//   console.log("sb thk h")
//    const adminNewOrder=new adminOrder({user:user._id});
//    console.log(adminNewOrder);
//    await adminNewOrder.save();

    }));
    


app.get('/user/:userId/myorders',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    // console.log(userId)
    const user= await User.findOne({'mobile':userId}).populate('Myorders').exec(function(err, result) {
        if(err){
            console.log(err);
        }
        else {
            if(result.Myorders)
            res.send(result.Myorders);
            else return res.json({message:'Oops!! You do not have any order'});
        }
    })
   
    // res.send(user.Myorders);
}))

app.get('/user/:userId/myrxes',catchAsync(async(req,res)=>{
    const {userId}=req.params;
    const user= await User.findOne({'mobile':userId}).populate('Rx').exec(function(err, result) {
        if(err){
            console.log(err);
        }
        else {
            res.send(result.Rx);
        }
    })
    // res.send(user.Rx);

}))



app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found !',404));
})
app.use((err,req,res,next)=>{
    const{statusCode=500}=err;
    if(!err.message)err.message='Something went wrong !';
    res.status(statusCode)
});
const port=process.env.PORT || 8000;



app.listen(port,()=>{
    console.log(`Running on port ${port}`);
})