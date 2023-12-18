import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const posts = [];

app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    title,
    content,
    id: posts.length + 1,
  };
  posts.push(newPost);
  res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).send("Post not found.");
  }
  res.render("edit", { post: post });
});

app.post("/edit/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...req.body };
    res.redirect("/");
  } else {
    res.status(404).send("Post not found.");
  }
});

app.post("/delete/:id", (req, res) => {
  const index = posts.findIndex((post) => post.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Post not found.");
  }
  posts.splice(index, 1);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
