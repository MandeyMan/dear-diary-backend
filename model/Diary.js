const mongoose = require('mongoose');

const DiarySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId ,
         ref :'User' ,
          required : true },
          story :{
             type : String , 
             required : true 
          },
          date : {
            type : Date,
            required : true
          },
          specialNote : {type : String},
});

module.exports = mongoose.model('Diary' , DiarySchema);