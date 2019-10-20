import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./src/schema/schema";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || "mongodb://ashish:test123@ds233198.mlab.com:33198/resumeguru";

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
 app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log("vuePress running on port :", PORT);
});
