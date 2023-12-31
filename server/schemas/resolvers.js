require("dotenv").config();
const { GraphQLUpload } = require("graphql-upload-minimal");
const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  SubCategory,
  Product,
  Category,
  Order,
} = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(process.env.STRIPE);
const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

const resolvers = {
  Upload: GraphQLUpload,
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
          { path: "subCategoryID" },
          { path: "images" },
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
    order: async (parent, { _id }, context) => {
      try {
        let order;

        // Check if the user is logged in
        if (context.user) {
          // If logged in, retrieve the user's orders
          const user = await User.findById(context.user._id).populate({
            path: "orders.products",
            populate: "category",
          });

          order = user.orders.id(_id);
        } else {
          // If not logged in, look up the order by _id directly
          order = await Order.findById(_id).populate("products");
        }

        // Check if the order exists
        if (order) {
          return order;
        } else {
          throw new Error("Order not found");
        }
      } catch (err) {
        console.error(err);
        throw new Error("Error fetching order");
      }
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
          images: [`${url}/images/${encodeURIComponent(products[i].images)}`],
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
      try {
        let order;

        // Check if the user is logged in
        if (context.user) {
          // If logged in, create an order and push it to the user's orders array
          order = new Order({ products });
          await User.findByIdAndUpdate(context.user_id, {
            $push: { orders: order },
          });
        } else {
          // If not logged in, create an order and save it directly to the database
          order = await Order.create({ products });
        }

        return order;
      } catch (err) {
        console.error(err);
        throw new Error("Error adding order");
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
    // Update a Product
    updateProduct: async (parent, { _id, quantity }) => {
      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: quantity } },
        { new: true }
      ).populate("images");
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
    // ...
// For future devlopment
    // singleUpload: async (parent, { file, productID, categoryID }) => {
    //   try {
    //     const { createReadStream, filename, mimetype, encoding } = await file;

    //     // Generate a unique key for the S3 object
    //     const key = `uploads/${uuidv4()}-${filename}`;

    //     // Upload the file to S3
    //     const uploadParams = {
    //       Bucket: process.env.AWS_S3_BUCKET_NAME,
    //       Key: key,
    //       Body: createReadStream(),
    //       ContentType: mimetype,
    //     };

    //     const data = await s3.upload(uploadParams).promise();

    //     // Create an Image document in your MongoDB collection with S3 URL
    //     const image = await Image.create({
    //       filename,
    //       mimetype,
    //       encoding,
    //       url: data.Location, // Store S3 URL
    //     });

    //     // If productID is provided, associate the image with the specified product
    //     if (productID) {
    //       await Product.findByIdAndUpdate(productID, {
    //         $push: { image },
    //       });
    //     }

    //     // If categoryID is provided, associate the image with the specified category
    //     if (categoryID) {
    //       await Category.findByIdAndUpdate(categoryID, {
    //         $push: { image },
    //       });
    //     }

    //     console.log('File upload successful');

    //     return image;
    //   } catch (error) {
    //     console.error('Error uploading file:', error);
    //     throw new Error('Failed to upload file');
    //   }
    // },
  },
};

module.exports = resolvers;
