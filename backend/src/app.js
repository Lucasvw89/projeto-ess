const express = require("express");
var cors = require('cors')
const app = express();
const router = require("./views/exemplo.routes");
const postRouter = require("./views/posts.routes");
const maintenanceRouter = require("./views/maintenance.routes");
const searchRouter = require("./views/search.routes");
const commentRouter = require("./views/comment.routes");
const pagesRouter = require("./views/pages.router");
const platformRouter = require("./views/platform.routes");
const movieRouter = require("./views/movies.routes");

app.use(express.json()); // Add this line to parse JSON request bodies

app.use(cors())

app.use("/", router);

// Miguel
app.use("/posts", postRouter);


//Aline
app.use("/maintenance", maintenanceRouter);

//Ariel
app.use("/movie", movieRouter);

// Vidal
app.use("/search", searchRouter);

// italo
app.use("/comment", commentRouter);

//João Pedro
app.use("/pages", pagesRouter);

// Eduarda
app.use("/platform", platformRouter);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});