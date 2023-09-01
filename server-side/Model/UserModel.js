var mongoose=require('mongoose');
const Schema=mongoose.Schema;


var UserSchema=new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
})

module.exports= mongoose.model('Users',UserSchema);