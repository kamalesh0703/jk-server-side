var mongoose=require('mongoose');
const Schema=mongoose.Schema;

var MusicSchema=new Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    artist:{
        type:String
    },
    coverAlbum:{
        type:String
    },
    url:{
        type:String
    },
    playlist:{
        type:String
    },
    id:{
        type:Number
    }
})
module.exports=mongoose.model('Music',MusicSchema);