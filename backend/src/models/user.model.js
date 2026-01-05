import { Mongoose } from "mongoose";

const userSchema = new Mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // CreatedAt, UpdatedAt
);

export const User = Mongoose.model("User", userSchema);
