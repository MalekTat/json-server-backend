require("dotenv").config();
const jsonServer = require("json-server");
const morgan = require("morgan");

// create two variables, path and fs
//path is a tool that has the .join method to join paths from the operating system to the another string
    //const path = require("path");
//fs is short for file system. Best metaphor is a librarian
    //const fs = require("fs");

//const cors = require('cors')
const server = jsonServer.create();

//JSON parse 'parses' data into JS

//fs.readFileSync is a method to read a file and return its content

//__dirname is the absolute path from the computers root directory to the current location

    //const db = JSON.parse(fs.readFileSync(path.join(__dirname, "db.json")));


const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const PORT = process.env.PORT || 5005;

//server.use(cors());
server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
}); 


server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))


server.use(router);

server.listen(PORT, () => {
  console.log(`JSON Server is running at port ${PORT}`);
});


