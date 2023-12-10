require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");
const { User, SubCategory, Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(process.env.STRIPE);

const resolvers = {
  Query: {
    // Get all categories
    categories: async (parent, args, context) => {
      return await Category.find();
    },
    // Get category by ID
    category: async (parent, { _id }) => {
      return await Category.findById(_id);
    },
    // Get all subcategories
    subCategories: async (parent, args, context) => {
      return await SubCategory.find();
    },
    // Get subcategory by ID
    subCategory: async (parent, { _id }) => {
      return await SubCategory.findById(_id);
    },
    // Get products by categoryID, subcategoryID or name
    products: async (parent, { categoryID, subCategoryID, name }) => {
      const params = {};
      if (categoryID) {
        params.categoryID = categoryID;
      }
      if (subCategoryID) {
        params.subCategoryID = subCategoryID;
      }
      if (name) {
        params.name = {
          $regex: name,
        };
      }
      return await Product.find(params)
        .sort({ createdAt: -1 })
        .populate([{ path: "categoryID" }, { path: "subCategoryID" }]);
    },
    // Get single product by ID
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("categoryID");
    },
    // Get user and user orders
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user_id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });
      const line_items = [];

      const { products } = await order.populate("products");

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`],
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },

  Mutation: {
    // Mutation to add a user
    addUser: async (parent, args) => {
      console.log(args);
      try {
        const user = await User.create(args);
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Failed to create user");
      }
    },
    // Add an order
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user_id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("You are not logged in");
    },
    // Update a user
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("You are not logged in");
    },
    // Update a Product
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    // Allows users to login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid email or password");
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid email or password");
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
