import { Request, Response } from "express";
import { Customer, ICustomer } from "../models/Customer";
import { Order, ICartItem } from "../models/Order";

// Interface for the request body
interface CreateOrderRequest {
  customerInfo: {
    firstName: string;
    lastName: string;
    fullAddress: string;
    email: string;
  };
  items: ICartItem[];
}

// Submit order endpoint
export const submitOrder = async (
  req: Request<{}, {}, CreateOrderRequest>,
  res: Response
): Promise<void> => {
  try {
    const { customerInfo, items } = req.body;

    // Validate request body
    if (
      !customerInfo ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid request data. Customer info and items are required.",
      });
      return;
    }

    // Check if customer already exists or create new one
    let customer: ICustomer;
    const existingCustomer = await Customer.findOne({
      email: customerInfo.email,
    });

    if (existingCustomer) {
      // Update existing customer info
      existingCustomer.firstName = customerInfo.firstName;
      existingCustomer.lastName = customerInfo.lastName;
      existingCustomer.fullAddress = customerInfo.fullAddress;
      customer = await existingCustomer.save();
    } else {
      // Create new customer
      customer = new Customer(customerInfo);
      customer = await customer.save();
    } // Calculate totals manually
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create new order
    const order = new Order({
      customerId: customer._id,
      items: items,
      totalItems: totalItems,
      totalPrice: totalPrice,
      orderDate: new Date(),
    });

    // Save order (totals will be calculated automatically by pre-save hook)
    const savedOrder = await order.save();

    // Populate customer info in response
    await savedOrder.populate("customerId", "firstName lastName email");

    // Send success response
    res.status(200).json({
      success: true,
      message: "Order submitted successfully",
      data: {
        orderId: savedOrder._id,
        customer: {
          id: customer._id,
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
        },
        order: {
          id: savedOrder._id,
          totalItems: savedOrder.totalItems,
          totalPrice: savedOrder.totalPrice,
          orderDate: savedOrder.orderDate,
        },
      },
    });
  } catch (error: any) {
    console.error("Error submitting order:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: validationErrors,
      });
      return;
    }

    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      res.status(409).json({
        success: false,
        message: "Customer with this email already exists",
      });
      return;
    }

    // Generic error response
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    });
  }
};
