var mongoose=require('mongoose');
const Schema=mongoose.Schema;


var PlaylistSchema=new Schema ({
    playlist:{
        type:String
    }
})

 module.exports=mongoose.model('Playlists',PlaylistSchema)