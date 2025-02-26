import * as bcrypt from "bcryptjs";
import { Schema } from "mongoose";

export function PasswordPlugin(schema: Schema) {
  // Hash the password before saving the document
  schema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Only hash if password is modified
    try {
      const salt = await bcrypt.genSalt(10); // Salt rounds
      this.password = await bcrypt.hash(this.password as string, salt);
      next();
    } catch (error: unknown) {
      next(error as Error);
    }
  });

  // Add verifyPassword method
  schema.methods.verifyPassword = async function (
    inputPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password);
  };
}
