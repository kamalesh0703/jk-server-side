let express=require('express');
let router=express.Router();
let PlaylistSchema=require('../Model/PlaylistModel');


router.post('/createPlaylist',(req,res)=>{
    PlaylistSchema.insertMany([req.body])
    res.json({
        "Status":"Sucessfull",
        "Msg":"Playlist create sucessfully"
    })
});
router.delete('/deletePlaylist/:id',async(req,res,next)=>{
    try{
        const{id}=req.params;
        console.log(id)
        const playlist=await PlaylistSchema.findByIdAndDelete({_id:id})
        console.log(playlist)
        res.json({"status":"sucess","Msg":"sucesfully delete the playlist"})
    }
    catch(error){
        next(error);
    }
})

router.get('/getPlaylist',(req,res)=>{
    PlaylistSchema.find()
    .then((data)=> res.json(data))
    .catch((error)=> res.json(error))
});


module.exports=router;
