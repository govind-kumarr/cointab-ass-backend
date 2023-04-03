import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  failedAttempts: { type: Number, default: 0 },
  blocked: {
    status: { type: Boolean, default: false },
    from: { type: String },
    to: { type: String },
  },
});

export const UserModel = mongoose.model("users", UserSchema);
