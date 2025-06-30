import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  name?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: String,
});

export default mongoose.model<IUser>("User", userSchema);
