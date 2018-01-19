var Campground = require("../models/campground");
var Comment = require("../models/comment");
var Rating = require("../models/rating");
// all the middleeare goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership =  function checkCampgroundOwnership(req, res, next){
       // is user logged 
      if (req.isAuthenticated()){
           // does user own the campground
           // find a campground with provided id
          Campground.findById(req.params.id, function(err, foundCampground){
                if (err){
                  req.flash("error","Campground not found")
                  res.redirect("back");
                } else {
                  // foundCampground.author.id is mongoose object type
                  // req.user.id is String
                  if (foundCampground.author.id.equals(req.user._id)){
                    next();
                  } else {
                    req.flash("error","You don't have permission to do it");
                    res.redirect("back");
                  }
                }
          });
      }else {
        req.flash("error","You need to be logged in to do that");
        res.redirect("/login");
      }
  
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
       // is user logged 
          if (req.isAuthenticated()){
               // does user own the campground
               // find a campground with provided id
              Comment.findById(req.params.comment_id, function(err, foundComment){
                    if (err){
                      console.log(err);
                      res.redirect("back");
                    } else {
                      // foundComment.author.id is mongoose object type
                      // req.user.id is String
                      if (foundComment.author.id.equals(req.user._id)){
                        next();
                      } else {
                        req.flash("error","You don't have permission to do it");
                        res.redirect("back");
                      }
                    }
              });
          }else {
            req.flash("error","You need to be logged in to do that")
            res.redirect("/login");
          }
  
}


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
      if (req.isAuthenticated()){
        return next();
      }else {
        req.flash("error", "You need to be logged in to do That!");
        res.redirect("/login");
      }
}

middlewareObj.checkRatingExists = function checkRatingExists(req, res, next){
      Campground.findById(req.params.id).populate("ratings").exec(function(err, campground){
            if (err){
              console.log(err);
            }
            for (var i = 0; i<campground.ratings.length; i++){
                if (campground.ratings[i].author.id.equals(req.user._id)){
                  req.flash("success", "You already rated this!");
                  return res.redirect("/campgrounds/" + campground._id);
                }
            }
            next();
      });
}


module.exports = middlewareObj;



