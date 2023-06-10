//Require all packages

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

//Text content for home, about and contact pages
const homeStartingContent = "❤️Welcome to my ever first blog website❤️✏️In here, you can make as many posts as you want✉️Post will show up on the home page up to 100 words👀Click show more if you wanna check the complete version🔛TRY OUT AND MAKE YOUR FIRST POST NOW!!!";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Connect with mongoose localhost
mongoose.connect("mongodb+srv://admin-bailing:ImgOvwuidIvekQCC@cluster0.a9ifcog.mongodb.net/blog", {useNewUrlParser: true});

//Create a new schema
const postSchema = {
  title: String,
  content: String
}

//Create a new collection
const Post = mongoose.model("post", postSchema);

//Get requests
app.get("/", function(req, res){

  Post.find({})
  .then(function(posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
    });
  })
  .catch(function(err){
    console.log(err);
  });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});


//Post Requests
app.post("/compose", function(req, res){
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;

  //Create a new document in mongoose
  const post = new Post({
    title: postTitle,
    content: postBody
  });
  console.log("post created!")
  post.save()
  .then(function(){
    res.redirect("/");
  })
  .catch(function(err){
    console.log(err);
  })
});

app.get("/posts/:postId", function(req, res){
  const requestedId = req.params.postId;

  Post.findById(requestedId)
  .then(function(post){
    res.render("post", {
        title: post.title,
        content: post.content
      });
  })
  .catch(function(err){
    console.log(err);
  })
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
