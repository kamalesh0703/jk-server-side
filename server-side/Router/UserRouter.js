let express=require('express');
let bcrypt=require('bcrypt');
let router=express.Router();
const UserSchema=require('../Model/UserModel');
const { randomBytes } = require('crypto');


router.post('/resgister',async(req,res)=>{
    const user=await UserSchema.findOne({email:req.body.email})

    if(user){
        res.json({
            "Status":"Failure",
            "Msg":"Already register this email please Login"
        })
    }
    else{
        const{name,email}=req.body;
        bcrypt.genSalt(10, (err,salt)=>{
            bcrypt.hash(req.body.password,salt,(err,hashedpassword)=>{
                const password=hashedpassword;
                const newuser=new UserSchema({name,email,password})
                newuser.save()
                .then(()=>res.json({"Status":"Sucess","Msg":"register sucessfully"}))
                .catch((err)=> res.json({"Status":"Error!"+err}))
            })
        })
    }
})
router.post('/login',async (req,res)=>{
    try{
        const user=await UserSchema.findOne({email:req.body.email})
        const passwordvalidate=await bcrypt.compare(req.body.password,user.password)
        if(!user){
            res.json({"Status":"Not Found","Msg":"User not found"})
        }
        else if(!passwordvalidate){
            res.json({"Status":"Failure","Msg":"invalid password"})
        }
        else{
            res.json({"Status":"sucessfull","Msg":"Login Successfully"})
        }
    }
    catch(error)
    {
        res.json(error)
    }
})

router.get('/getRegisterUser',(req,res)=>{
    UserSchema.find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json(error))
})

module.exports=router;