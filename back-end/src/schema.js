import mongoose from "mongoose";

const { Schema } = mongoose;

mongoose.connect(
  "mongodb+srv://edward885788:2vC7bRgJVW9TC73P@ashotcluster.umsca7q.mongodb.net/"
);

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  userlastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
  historyOfPurchase: {
    type: Array,
    required: true,
  },
  shippingAddress: {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  cartItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  emailsSent: [
    {
      id: {
        type: String,
        required: true,
      },
      fullname: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      status: {
        type: Boolean, // in case if someone reads - this is for identifying if the email was replied or not
        required: true,
      },
      created: {
        type: Date,
        required: true,
        default: Date.now(),
      },
    },
  ],
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const ProductsSchema = new Schema({
  created: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isInStock: {
    type: Boolean,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: {
    type: Array,
    required: true,
  },
  views: {
    type: Number,
  },
});

const bestDealSchema = new Schema({
  createdAt: {
    type: Date,
    reqiured: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  oldPrice: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

const monthlyActiveUsersSchema = new Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  activeUsers: {
    type: Array,
    required: true,
  },
});

const User = mongoose.model("Users", userSchema);
const Products = mongoose.model("Products", ProductsSchema);
const MonthlyActiveUsers = mongoose.model(
  "MonthlyActiveUsers",
  monthlyActiveUsersSchema
);
export { User, Products, MonthlyActiveUsers };
