import * as mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  resumes: [
    {
      name: { type: String },
      email: { type: String },
      address: { type: String },
      phone: { type: String },
      objective: { type: String },
      experience: [
        {
          position: { type: String },
          name: { type: String },
          location: { type: String },
          start: { type: String },
          end: { type: String },
          description: { type: String }
        }
      ]
    }
  ]
});

export default mongoose.model("User", userSchema);
