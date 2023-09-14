const mongoose = require("mongoose")
const validator = require('validator')

//connection creation and creating a new db
mongoose.connect("mongodb://127.0.0.1:27017/startmongo")
.then(()=>console.log("connected sucessfull"))
.catch((err)=>console.log("not connected"))


const playSchema = new mongoose.Schema({
    name:{
         type: String,
         required:true,
         unique:true,
         uppercase:true,
         trim: true,
         minlength:[2, "minimum 2 letter"],
         maxlength:30


    },
    course: {
      type:String,
      //validate(value){
//  if(value < 0){
//     throw new Error('videos count should not be negative')
//  },

      lowercase:true,
     // enum:["frontend", "backend", "database"]
    
    videos:Number,
   //  validate:{
   //    validator:function(value){
   //       return  value.length < 0
   //    },
   //    message:"videos count should not be negative"
   //       }
   //       },
    author:String,
    email:{
        type:String,
        required: true,
        unique: true,
        validate(value){
         if(!validator.isEmail(value)){
         throw new Error("Email is Invalid");
        }
      }
    },
    action: Boolean,
    date:{
        type:Date,
        default:Date.now()
    }
}

})
const Playlist = new mongoose.model("Playlist", playSchema)

// create document or insert document.
const createDocument = async () => {
try{
   //  const jsPlaylist = new Playlist({
   //      name:"javascript",
   //      course:"frontend",
   //      videos: 150,
   //      author: "Prakash dubey",
   //      action: true,
       
   //   })

   //   const MongoPlaylist = new Playlist({
   //      name:"MongoDB",
   //      course:"Backend",
   //      videos: 60,
   //      author: "Prakash dubey",
   //      action: true,
       
   //   })

     const mongoosePlaylist = new Playlist({
        name:"MonGoose JS" ,
        course:"Database",
        videos: 4,
        author: "Prakash dubey",
        email:"youtub.e@gmai.l",
        action: true,
       
     })

   //   const ExpressPlaylist = new Playlist({
   //      name:"Express js",
   //      course:"Back end",
   //      videos: 60,
   //      author: "Prakash dubey",
   //      action: true,
       
   //   })
    const result = await Playlist.insertMany([mongoosePlaylist]);
   //  const result = await Playlist.insertMany([jsPlaylist,MongoPlaylist,mongoosePlaylist,ExpressPlaylist]);
     console.log(result)
     
     }catch(err){
        console.log(err)
     }
}

createDocument();

// read or querying operator.

const getDocument = async () => {

try{
    const result = await Playlist.find({author: "Prakash dubey"}).
    select({name:1})
    .sort("name : 1");
    //.countDocuments();
    //.limit(1);
    // console.log(result);
     
    
    
}catch(err){
//console.log(err)
}
}


// conditional operator...in mongodb
// try{
// const result = await Playlist.find({videos:{$gt: 50}}) //{$in: ["Back End"]} //nin = not in 
// .select({name:1})
// //.limit(1);
// console.log(result);
// }catch(err){
//    console.log(err)
// }

// logical operator..

// const hatDocument = async () => {
//    try{
//       const result = await Playlist
//       // .find({$or: [{course:"Backend"}, {author:"Prakash dubey"} ]})
//       .find({$and: [{course:"Backend"},{author:"Prakash duby"}]})
//       .select({name:1})
//       console.log(result);
//    }catch(err){
//       console.log(err)
//    }
// }

////sort and count query in database

// const hatDocument = async () => {
//       try{
//          const result = await Playlist
//          // .find({$or: [{course:"Backend"}, {author:"Prakash dubey"} ]})
//          .find({$and: [{course:"Backend"},{author:"Prakash duby"}]})
//          .select({name:1})
//          console.log(result);
//       }catch(err){
//          console.log(err)
//       }
//    }

getDocument();

// update the document.
// const updateDocuments = async (_id) => {
// try{
//    const result =  await Playlist.updateOne({_id},{ //findByIdAndUpdate =find id and update
//       $set : {
//         name : "back end"
//       }
//    },{
//       new : true,
//       useFindAndModify : false
//    } );
  
  
//   console.log(result);
// }catch(err){
//    console.log(err);
// }
// }
 
// updateDocuments("64425ad331d9b14149ac9918");


// delete the document

const deleteDocument = async (_id) => {
   try{
  
    const result = await  Playlist.deleteOne({_id}) //findByIdAndDelete
    console.log(result);

   }catch(err){
    console.log(err)
   }
}
//deleteDocument('64425ad331d9b14149ac9918');

