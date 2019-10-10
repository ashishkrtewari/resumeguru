import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./src/schema/schema";
import mongoose from "mongoose";
import cors from "cors"

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://ashish:test123@ds233198.mlab.com:33198/resumeguru";

//Mongoose Connect
mongoose.Promise = global.Promise;
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to DB');
});

app.use(cors);

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
});
