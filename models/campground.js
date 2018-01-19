var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
      name : String,
      image: String,
      price: String,
      location:String,
      lat: Number,
      lng: Number,
      description: String,
      createdAt: {type: Date, default:Date.now},
      author: {
               id: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref:"User"
                    },
               username: String
      },
      comments:[
        {
          type: mongoose.Schema.Types.ObjectId,
          ref:"Comment"
        }
      ],
//       ratings: [
//         {
//           type:mongoose.Schema.Types.ObjectId,
//           ref:"Rating"
//         }
//       ],
      rating: {type: Number, default:0}
});

module.exports = mongoose.model("Campground", campgroundSchema);