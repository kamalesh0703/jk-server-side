let express=require('express');
let mongoose=require('mongoose');
let cors=require('cors');
let bodyParser=require('body-parser');
let dbConfig=require('./DataBase/DataBase');


const Userrouter=require('./Router/UserRouter');
const Musicrouter=require('./Router/MusicRouter');
const Playlistrouter=require('./Router/PlaylistRouter');

let app=express()

mongoose.connect(dbConfig.db)
.then(()=>{
    console.log("DataBase Succesfully connected!")
},
error =>{
    console.log("Could not connect to Database:"+error)
})



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use("/upload/audio",express.static("upload/audio"))
app.use('/User',Userrouter)
app.use('/Playlist',Playlistrouter)
app.use('/Music',Musicrouter)

app.listen(5002,()=>{
    console.log("Server Started, running port 5002")
})