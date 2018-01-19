var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
   // passportLocalMongoose = require("passport-local-mongoose");
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");


// requiring routes
var commentRouters = require("./routes/comments"),
    campgroundRouters = require("./routes/campgrounds"),
   // ratingRouters = require("./routes/ratings"),
    indexRouters = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/fun_camp_test";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//require moment
app.locals.moment = require('moment');
//seedDB();  // seed the database

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"I love coding",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));   // User.authenticate() is from passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// this middleware is for each single route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",indexRouters);
app.use("/campgrounds",campgroundRouters);
app.use("/campgrounds/:id/comments",commentRouters);
//app.use("/campgrounds/:id/ratings", ratingRouters);

app.listen(process.env.PORT || 3000,function(){
  console.log("The FunCamp Server has started!");
});