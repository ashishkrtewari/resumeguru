import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const experienceSchema = new Schema({
  position: { type: String },
  name: { type: String },
  location: { type: String },
  start: { type: String },
  end: { type: String },
  description: { type: String }
});
const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  phone: { type: String },
  objective: { type: String },
  experience: [experienceSchema]
});

export default mongoose.model("User", userSchema);
