import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./src/schema/schema";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

//Mongoose Connect
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useFindAndModify", false);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to DB");
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow Cross Origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: false,
  })
);

app.listen(PORT, () => {
  console.log("vuePress running on port :", PORT);
});
