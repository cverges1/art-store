//importing our database connection
const db = require("./connection");
const { User, Product, Category, SubCategory } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: "Originals", categoryImage: "Placeholder-Landscape.jpg"},
    { categoryName: "Prints", categoryImage: "Placeholder-Landscape.jpg" },
    { categoryName: "Art Commissions", categoryImage: "Placeholder-Landscape.jpg" },
  ]);
  //console log that lets us know that the categories have been seeded
  console.log("categories seeded");

  await SubCategory.deleteMany();

  const subCategories = await SubCategory.insertMany([
    { subCategoryName: "Oils" },
    { subCategoryName: "Watercolors" },
    { subCategoryName: "Pen and Ink" },
    { subCategoryName: "Acrylics" },
  ]);
  //console log that lets us know that the subcategories have been seeded
  console.log("SubCategories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Oil Painting 1",
      description: "Oil on canvas and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      price: 75.0,
      quantity: 1
    },
    {
      name: "Oil Painting 2",
      description: "Oil on canvas and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      price: 75.0,
      quantity: 1
    },
    {
      name: "WaterColor Painting 1",
      description: "Watercolor on cold pressed paper and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      price: 65.0,
      quantity: 1
    },
    {
      name: "WaterColor Painting 2",
      description: "Watercolor on cold pressed paper and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      price: 65.0,
      quantity: 1
    },
    {
      name: "Pen and Ink 1",
      description: "Pen and Ink on cold pressed paper and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      price: 55.0,
      quantity: 1
    },
    {
      name: "Pen and Ink 2",
      description: "Pen and Ink on cold pressed paper and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      price: 55.0,
      quantity: 1
    },
    {
      name: "Acrylic 1",
      description: "Acrylic on canvas and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[3]._id,
      price: 65.0,
      quantity: 1
    },
    {
      name: "WaterColor Print 1",
      description: "Watercolor Print and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      price: 25.0,
      quantity: 20
    },
    {
      name: "WaterColor Print 2",
      description: "Watercolor Print and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      price: 25.0,
      quantity: 20
    },
    {
      name: "Pen and Ink Print 1",
      description: "Pen and Ink on cold pressed paper and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[2]._id,
      price: 55.0,
      quantity: 20
    },
    {
      name: "Pen and Ink Print 2",
      description: "Pen and Ink on cold pressed paper and dimensions",
      image: "Placeholder-Landscape.jpg",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[2]._id,
      price: 55.0,
      quantity: 20
    },
  ]);
  //console log that lets us know that the subcategories have been seeded
  console.log("products seeded");

  process.exit();
});
