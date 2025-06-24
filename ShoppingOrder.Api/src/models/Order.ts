import mongoose, { Document, Schema } from "mongoose";

// Cart Item interface
export interface ICartItem {
  id: string;
  category: string;
  productName: string;
  quantity: number;
  price: number;
}

// Order interface
export interface IOrder extends Document {
  customerId: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
  orderDate: Date;
}

// Cart Item sub-schema
const CartItemSchema = new Schema<ICartItem>(
  {
    id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      max: [999, "Quantity cannot exceed 999"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
  },
  { _id: false } // Don't create _id for sub-documents
);

// Order schema
const OrderSchema = new Schema<IOrder>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "Customer ID is required"],
  },
  items: {
    type: [CartItemSchema],
    required: [true, "Order items are required"],
    validate: {
      validator: (items: ICartItem[]) => items.length > 0,
      message: "Order must contain at least one item",
    },
  },
  totalItems: {
    type: Number,
    required: [true, "Total items items are required"],
    min: [1, "Total items must be at least 1"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price items are required"],
    min: [0, "Total price must be positive"],
  },
  orderDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// Create indexes
OrderSchema.index({ customerId: 1 });
OrderSchema.index({ orderDate: -1 });

// Calculate totals before validation
OrderSchema.pre("validate", function (next) {
  // Calculate total items and total price
  if (this.items && this.items.length > 0) {
    this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
    this.totalPrice = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  next();
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
