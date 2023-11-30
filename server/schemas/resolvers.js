require("dotenv").config();
const { AuthenticationError } = require("apollo-server-express");
const { User, SubCategory, Product, Category } = require("../models");
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
        .populate([
          { path: "categoryID" },
          { path: "subCategoryID" }
        ]);
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
    // Update a user
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw new AuthenticationError("You are not logged in");
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
