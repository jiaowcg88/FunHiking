var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware= require("../middleware"); 

// Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
  //find campground by id
  Campground.findById(req.params.id, function(err, campground){
    if (err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});   
    }
  });
  
});

// Comments CREATE
router.post("/",middleware.isLoggedIn, function(req, res){
   // lookup campground using ID
      Campground.findById(req.params.id, function(err, campground){
          if (err){
            console.log(err);
            res.redirect("/campgrounds");
          }else {
             var comment = {
                text: req.body.text,
                rating: req.body.rating
               
             };
             // create new comment
            // connect new comment ot campground
            // redirect to campground show page  
            Comment.create(comment, function(err, newComment){
                if (err){
                  req.flash("error", "Something is wrong")
                  console.log(err);
                }else {
                  // add username and id to commentRouters
                  newComment.author.id = req.user._id;
                  newComment.author.username = req.user.username;
                  //save comment
                  newComment.save();
                  campground.comments.push(newComment._id);
                  campground.save();
                  req.flash("success","Successfully added comments")
                  res.redirect("/campgrounds/" + campground._id);
                }
            });
           
          }
      });
  
});


// Comment Edit Route
router.get("/:comment_id/edit",middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
           res.redirect("back");
        } else {
           res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
  });
  
});

// Comment update
router.put("/:comment_id",middleware.checkCommentOwnership, function(req, res){
        var comment ={
          text: req.body.text,
          rating: req.body.rating
        }
        Comment.findByIdAndUpdate(req.params.comment_id, comment, function(err, updateComment){
              if (err){
                res.redirect("back");
              } else {
                 res.redirect("/campgrounds/"+ req.params.id);
              }
        });
});

// Comment Destroy 
router.delete("/:comment_id",middleware.checkCommentOwnership, function(req, res){
        Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
            if (err){
              res.redirect("back");
            } else {
              req.flash("success","Successfully deleted Comment")
              res.redirect("/campgrounds/" + req.params.id);
            }
          
        });
});

module.exports = router;
