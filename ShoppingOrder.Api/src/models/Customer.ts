import mongoose, { Document, Schema } from "mongoose";

// Customer interface
export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  fullAddress: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Customer schema
const CustomerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxLength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxLength: [50, "Last name cannot exceed 50 characters"],
    },
    fullAddress: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
      maxLength: [200, "Address cannot exceed 200 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Create indexes
CustomerSchema.index({ email: 1 });
CustomerSchema.index({ createdAt: -1 });

// Export the model
export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
