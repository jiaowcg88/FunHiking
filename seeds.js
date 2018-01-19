var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//mongoose.Promise = global.Promise;
var data =[
      { name:"Lake Campground",
        image:"https://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg", 
        description:  "Lorem ipsum dolor sit amet, at graece essent eam" +
                       "est primis euismod invidunt ad. Error ignota indoctum eu vel, mea labore invenire ea." +
                       "Per soluta debitis ut. Qui brute intellegam mediocritatem ut, ius ne tale definitiones."  + 
                       "Nulla volumus percipit eum no.Congue ubique ponderum ei sed. Integre quaestio eu nam. Sit at dictas commodo." 
      },
      { name: "Bear Mountain",
        image: "https://s3-media2.fl.yelpcdn.com/bphoto/FCw1tyDLKscSQ0tlIo1SDg/o.jpg",
        description:"Lorem ipsum dolor sit amet, at graece essent eam" +
                     "est primis euismod invidunt ad. Error ignota indoctum eu vel, mea labore invenire ea." +
                     "Per soluta debitis ut. Qui brute intellegam mediocritatem ut, ius ne tale definitiones."  + 
                     "Nulla volumus percipit eum no.Congue ubique ponderum ei sed. Integre quaestio eu nam. Sit at dictas commodo." 
      },
      { name: "Canyon Floor",
        image: "https://www.nps.gov/yell/planyourvisit/images/688_artistspoint.jpg?maxwidth=650&autorotate=false",
        description:"Lorem ipsum dolor sit amet, at graece essent eam" +
                   "est primis euismod invidunt ad. Error ignota indoctum eu vel, mea labore invenire ea." +
                   "Per soluta debitis ut. Qui brute intellegam mediocritatem ut, ius ne tale definitiones."  + 
                   "Nulla volumus percipit eum no.Congue ubique ponderum ei sed. Integre quaestio eu nam. Sit at dictas commodo." 
       
      },
      { name: "Summer Camping",
        image: "http://bustedwallet.com/wp-content/uploads/2014/05/Camping-Near-The-Lake-Background-Wallpaper.jpg",
        description:"Lorem ipsum dolor sit amet, at graece essent eam" +
                       "est primis euismod invidunt ad. Error ignota indoctum eu vel, mea labore invenire ea." +
                       "Per soluta debitis ut. Qui brute intellegam mediocritatem ut, ius ne tale definitiones."  + 
                       "Nulla volumus percipit eum no.Congue ubique ponderum ei sed. Integre quaestio eu nam. Sit at dictas commodo." 
      }
    ];
function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
      if (err){
        console.log(err);
      } else {
        console.log("removed all campgrounds!");
           // add a few campgrounds
//         data.forEach(function(seed){
//           Campground.create(seed, function(err, campground){
//             if (err){
//               console.log(err);
//             }else {
//               console.log("added a campground");
//               Comment.create({
//                 text:"This is beautiful",
//                 author:"Joanna"
//               }, function(err, comment){
//                 if (err){
//                   console.log(err);
//                 }else {
//                   campground.comments.push(comment._id);
//                   campground.save(function(err, saveCampground){
//                     if (err){
//                       console.log(err);
//                     }else {
//                       console.log(saveCampground);
//                     }
//                   });
//                   console.log("Created a new comment");
//                 }
                
//               });
//             }
//           });
//         });
          }
        });
 
    // add a few comments
  
  
}

module.exports = seedDB;
