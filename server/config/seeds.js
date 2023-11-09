//importing our database connection
const db = require("./connection");
const { User, Product, Category, SubCategory } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: "Originals", categoryImage: "xxxxxx" },
    { categoryName: "Prints", categoryImage: "xxxxxx" },
    { categoryName: "Commissions", categoryImage: "xxxxxx" },
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
      price: 75.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
    },
    {
      name: "Oil Painting 2",
      description: "Oil on canvas and dimensions",
      price: 75.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
    },
    {
      name: "WaterColor Painting 1",
      description: "Watercolor on cold pressed paper and dimensions",
      price: 65.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
    },
    {
      name: "WaterColor Painting 2",
      description: "Watercolor on cold pressed paper and dimensions",
      price: 65.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
    },
    {
      name: "Pen and Ink 1",
      description: "Pen and Ink on cold pressed paper and dimensions",
      price: 55.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
    },
    {
      name: "Pen and Ink 2",
      description: "Pen and Ink on cold pressed paper and dimensions",
      price: 55.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
    },
    {
      name: "Acrylic 1",
      description: "Acrylic on canvas and dimensions",
      price: 65.0,
      image: "placeholder",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[3]._id,
    },
    {
      name: "WaterColor Print 1",
      description: "Watercolor Print and dimensions",
      price: 25.0,
      image: "placeholder",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
    },
    {
      name: "WaterColor Print 2",
      description: "Watercolor Print and dimensions",
      price: 25.0,
      image: "placeholder",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
    },
    {
      name: "Pen and Ink Print 1",
      description: "Pen and Ink on cold pressed paper and dimensions",
      price: 55.0,
      image: "placeholder",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[2]._id,
    },
    {
      name: "Pen and Ink Print 2",
      description: "Pen and Ink on cold pressed paper and dimensions",
      price: 55.0,
      image: "placeholder",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[2]._id,
    },
  ]);
  //console log that lets us know that the subcategories have been seeded
  console.log("products seeded");

  process.exit();
});
