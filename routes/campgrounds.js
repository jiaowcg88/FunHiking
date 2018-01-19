var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");
var geocoder = require('geocoder');
 

// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


//INDEX - show all campgrounds
router.get("/", function(req, res){
  if(req.query.search && req.xhr) {
      const regex = new RegExp(escapeRegex(req.query.search), 'gi');
      // Get all campgrounds from DB
      Campground.find({name: regex}, function(err, allCampgrounds){
         if(err){
            console.log(err);
         } else {
            res.status(200).json(allCampgrounds);
         }
      });
  } else {
      // Get all campgrounds from DB
      Campground.find({}, function(err, allCampgrounds){
         if(err){
             console.log(err);
         } else {
            if(req.xhr) {
              res.json(allCampgrounds);
            } else {
              res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
            }
         }
      });
  }
});

//CREATE ROUTE : add new campground to DB
router.post("/",middleware.isLoggedIn,function(req, res){
   // get data from form and add to campgounds array
      var name = req.body.name;
      var price = req.body.price;
      var img = req.body.image;
      var description = req.body.description;
      var location = req.body.location;
      var author ={
        id: req.user._id,
        username: req.user.username
      }
        geocoder.geocode(req.body.location, function (err, data) {
      if (err || data.status === 'ZERO_RESULTS') {
        req.flash('error', 'Invalid address');
        return res.redirect('back');
      }
      var lat = data.results[0].geometry.location.lat;
      var lng = data.results[0].geometry.location.lng;
      var location = data.results[0].formatted_address;
      var newCampground = {name: name, price:price, image:img,description:description, author: author, location: location, lat: lat, lng: lng};
  // Create a new campground and save to database
  Campground.create(newCampground, function(err, newlyCreated){
    
    if (err){
      console.log(err);
    }else {
        // redirect back to campgrounds page
      req.flash('success','Successfully Created A new Hiking Place')
      res.redirect("/campgrounds");
    }
  });
});
});

// NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn, function(req,res){
  res.render("campgrounds/new");
});

// SHOW-shows more info about one campground
router.get("/:id", function(req, res){
  // find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
      if (err){
        console.log(err);
      } else {
        // calculate the average of rating of campgrounds
        var length = foundCampground.comments.length;
        var sum = 0;
        foundCampground.comments.forEach(function(comment){
           sum += comment.rating;
        });
        var result =parseFloat(sum/length).toFixed(2);
        foundCampground.rating = result;
        // render show template with that campground
        res.render("campgrounds/show",{campground: foundCampground});
      }
  }); 
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req, res){

   Campground.findById(req.params.id, function(err, foundCampground){
      //  console.log(foundCampground);
       res.render("campgrounds/edit",{campground: foundCampground});
   });
});

// PUT - updates campground in the database
router.put("/:id", function(req, res){
  console.log(req.body);
  geocoder.geocode(req.body.location, function (err, data) {
    if (err){
      console.log(err);
    }else {
    var lat = data.results[0].geometry.location.lat;
    var lng = data.results[0].geometry.location.lng;
    var location = data.results[0].formatted_address;
    var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
    Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/campgrounds/" + campground._id);
        }
    });
  }});
});

// DELETE - removes campground and its comments from the database
router.delete("/:id", middleware.isLoggedIn, middleware.checkCampgroundOwnership, function(req, res) {
    Comment.remove({
      _id: {
        $in: req.campground.comments
      }
    }, function(err) {
      if(err) {
          req.flash('error', err.message);
          res.redirect('/');
      } else {
          req.campground.remove(function(err) {
            if(err) {
                req.flash('error', err.message);
                return res.redirect('/');
            }
            req.flash('error', 'Campground deleted!');
            res.redirect('/campgrounds');
          });
      }
    })
});

module.exports = router;
  