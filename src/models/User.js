import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
});

/* HASH PASSWORD */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  next();
});

/* COMPARE PASSWORD */
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.passwordHash);
};

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);
