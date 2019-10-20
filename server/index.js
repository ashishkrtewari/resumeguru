import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./src/schema/schema";
import cors from "cors";
import mongoose from "mongoose";
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

//Mongoose Connect
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

// Allow Cross Origin
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

 // All remaining requests return the React app, so it can handle routing.

const root = require('path').join(__dirname, '../client', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

app.listen(PORT, () => {
  console.log("vuePress running on port :", PORT);
});
