let express = require("express");
let multer = require("multer");
let router = express.Router();
let MusicSchema = require("../Model/MusicModel");
const BaseUrl = "localhost:5000/upload/audio/";

const storage = multer.diskStorage({
  filename: function (req, audio, cb) {
    cb(null, audio.originalname);
  },
  destination: function (req, audio, cb) {
    cb(null, "./upload/audio");
  },
});

const upload = multer({ storage });

router.post("/uploadMusic", upload.single("audio"), (req, res) => {
  const { title, description, coverAlbum, artist,id } = req.body;
  MusicSchema.insertMany([
    {
      title: title,
      description: description,
      coverAlbum: coverAlbum,
      artist: artist,
      url: `http://localhost:5002/upload/audio/${title}.mp3`,
      id:id,
      playlist:""
    },
  ]);
  res.json({ status: "Success", Msg: "Music Upload Sucessfully" });
});

router.put("/addPlaylist/:id", async(req, res,next) => {
  try {
    const { id } = req.params;
    const { title, description, coverAlbum, artist, url} = req.body;

   const pldf=await MusicSchema.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        description: description,
        artist: artist,
        url: url,
        coverAlbum: coverAlbum,
        playlist:req.body.playlist
      }
    );
    res.json({
      Status: "Sucessfull",
      Msg: "playlist add Sucessfully",
    });
  } catch (error) {
         next(error);
  }
});

router.put('/removePlaylist/:id',async(req,res)=>{
    try{
        const{id}=req.params;
        const playlist=await MusicSchema.findByIdAndUpdate({_id: id},{
            title:req.body.title,
            description:req.body.description,
            artist:req.body.artist,
            url:req.body.artist,
            playlist:""
        })
        res.json({
            "Status":"Scuessfull",
            "Msg":"remove playlist sucessfully"
        })
    } catch(error){
        next(error);
    }
})
router.get('/getSong/:id',(req,res)=>{

  const{id}=req.params;
  MusicSchema.find({id:id})
     .then(data => res.json(data))
     .catch(error => res.json(error))
})

router.get('/getMusic',(req,res)=>{
      MusicSchema.find()
 
      .then(data => res.json(data))
      .catch(error => res.json(error))
})


module.exports=router;