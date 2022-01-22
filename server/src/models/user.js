import * as mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
          description: { type: String },
        },
      ],
    },
  ],
});

userSchema.pre(
  "save",
  function (next) {
    var user = this;
    if (!user.isModified("password")) {
      return next();
    }
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
      user.password = hashedPassword;
      next();
    });
  },
  function (err) {
    next(err);
  }
);

export default mongoose.model("User", userSchema);
