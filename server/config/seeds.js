// Importing our database connection
const db = require("./connection");
const { User, Product, Category, SubCategory } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: "Originals", categoryImage: "originals.jpeg" },
    { categoryName: "Prints", categoryImage: "prints.jpeg" },
    { categoryName: "Art Commissions", categoryImage: "commissions.JPG" },
  ]);

  // Console log that lets us know that the categories have been seeded
  console.log("Categories seeded");

  await SubCategory.deleteMany();

  const subCategories = await SubCategory.insertMany([
    { subCategoryName: "Oils" },
    { subCategoryName: "Watercolors" },
    { subCategoryName: "Pen and Ink" },
    { subCategoryName: "Acrylics" },
  ]);

  // Console log that lets us know that the subcategories have been seeded
  console.log("SubCategories seeded");

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: "Billie Eilish",
      description:
        "This original portrait is of singer-songwriter Billie Eilish. Crafted with pencil, pen, and ink, it captures the essence of the artist's unique style.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      images: "billie-eilish.jpeg",
      price: 45.0,
      quantity: 1,
    },
    {
      name: "Canyon at Dusk",
      description:
        "Immerse yourself in the serene beauty of a river winding through a canyon at dusk with this original landscape. Created using oil paints on canvas.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      images: "canyon-river-dusk.JPG",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Death to Life",
      description:
        "Embark on a profound journey of transformation with our art print titled 'Death to Life.' This captivating piece, skillfully blending pen, ink, and watercolor, symbolizes rebirth after a traumatic experience.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "death-to-life.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Elegant Elephant",
      description:
        "Discover the graceful beauty of our 'Elegant Elephant' print. Created using watercolor on cold-pressed paper, this piece exudes tranquility and charm.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "elephant.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Feeling Pine",
      description:
        "Experience the rustic charm of 'Feeling Pine,' a pen and ink print on cold-pressed paper. This artwork captures the essence of nature in its detailed portrayal of a pine tree.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "feeling-pine.jpeg",
      price: 75.0,
      quantity: 1,
    },
    {
      name: "Bottom of the Canyon",
      description:
        "Journey to the 'Bottom of the Canyon' with this original oil painting. The intricate details capture the depth and beauty of the Grand Canyon's rugged landscape.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      images: "grand-canyon-oil.jpeg",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Bright Angel Trail",
      description:
        "Immerse yourself in the vibrant 'Bright Angel Trail' with this original watercolor and pen and ink piece. The artwork depicts the majestic beauty of the Grand Canyon as seen from the iconic Bright Angel Trail.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "grand-canyon-watercolor.jpeg",
      price: 115.0,
      quantity: 1,
    },
    {
      name: "Humphrey's Peak",
      description:
        "Adorn your space with a print of 'Humphrey's Peak,' showcasing the beauty of Flagstaff, AZ. This watercolor and pen and ink piece offers a picturesque view of the iconic peak.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "humphrey's-peak.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "In the Inlet",
      description:
        "Transport yourself to an 'Inlet' surrounded by glaciers with this oil painting print. The seagulls and pine trees create a serene atmosphere captured in vivid detail.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "inlet.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "On the Edge",
      description:
        "Feel the thrill with 'On the Edge,' an oil painting print capturing a single pine tree near the bank of a waterfall. The detailed depiction exudes a sense of natural beauty.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "leaning-pine.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Lone Mesa",
      description:
        "Admire the solitary beauty of 'Lone Mesa' with this print of an oil painting. The desert landscape with a single mesa is rendered in stunning detail, perfect for any art collection.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "lone-mesa.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Man Sitting",
      description:
        "Own a piece of artistry with 'Man Sitting,' an original pen and ink portrait featuring cross-hatching techniques. The portrayal captures a man's essence with five shades of detail.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      images: "man-portrait.jpeg",
      price: 85.0,
      quantity: 1,
    },
    {
      name: "A Hike to Remember",
      description:
        "Relive the beauty of a memorable hike with this watercolor, pen and ink print. A desert landscape unfolds, two figures sit beneath a mesquite tree, gazing into the distance.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "mother-son.jpg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Branching Out || Black and White",
      description:
        "Embrace the intricate details of 'Branching Out' with this black and white pen and ink print. The giant oak tree extends its branches, creating a captivating contrast against the stark background.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[2]._id,
      images: "oak-black-and-white.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Branching Out || Color",
      description:
        "Experience the vibrant beauty of 'Branching Out' with this color print. Created using watercolor and pen and ink, the giant oak tree with its expansive branches becomes a focal point of natural elegance.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "oak-color.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Family Outing",
      description:
        "Celebrate the joy of family with our 'Family Outing' print. Created with watercolor and pen and ink, the artwork depicts a family enjoying a day outdoors, complete with their faithful dog.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "park-bench.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Those Eyes",
      description:
        "Capture the captivating gaze with 'Those Eyes,' a watercolor, pen and ink print. The detailed portrait of a woman evokes a sense of mystery and allure.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "portrait-color.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Purple Mountains",
      description:
        "Transport yourself to the majestic 'Purple Mountains' with this watercolor and pen and ink print. The landscape, featuring cotton candy clouds and a golden hue, creates a serene atmosphere over the forest and stream.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "purple-mountains.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Feeling Blessed, Never Stressed",
      description:
        "Experience serenity with 'Feeling Blessed, Never Stressed,' a watercolor, pen and ink print. A manatee relaxes in a pool of waterfalls, creating a tranquil scene reminiscent of a peaceful bathhouse.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "relaxed-manatee.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Rebel Scum",
      description:
        "Celebrate the spirit of rebellion with 'Rebel Scum,' a watercolor, pen and ink print. A Star Wars rebel fighter floats gracefully with an X-wing in the background.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "starwars.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Very Superstitious",
      description:
        "Immerse yourself in the magic of the Superstition Mountains with 'Very Superstitious.' This original watercolor and pen and ink landscape captures the essence of the range as seen from Lost Dutchman State Park.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "superstitions.jpeg",
      price: 125.0,
      quantity: 1,
    },
    {
      name: "Tall Waterfalls and Perilous Peaks",
      description:
        "Embark on an adventure with 'Tall Waterfalls and Perilous Peaks,' an original oil painting. The landscape features a large waterfall with jagged peaks in the distance, creating a scene of natural wonder.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      images: "tall-falls.JPG",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "To Rule Them All",
      description:
        "Enter the world of fantasy with 'To Rule Them All,' an original pen and ink artwork featuring Sauron from The Lord of the Rings and the One Ring. The intricate details bring the iconic villain to life.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      images: "to-rule-them-all.jpeg",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Off the Coast",
      description:
        "Experience the beauty of the coast with 'Off the Coast,' an original watercolor and pen and ink artwork. Seagulls fly around pine trees, creating a serene and picturesque scene.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "watercolor-pine.jpeg",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Golden Hour",
      description:
        "Bask in the golden glow with 'Golden Hour,' an original acrylic painting. Purple mountains, cotton candy clouds, and a golden hue create a breathtaking landscape over a forest and stream.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[3]._id,
      images: "waterfall-at-sunset.JPG",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Weaver's Needle",
      description:
        "Explore the beauty of Arizona with 'Weaver's Needle,' an original watercolor and pen and ink artwork. The landscape captures the iconic Weaver's Needle located in Arizona.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "weavers-needle.JPG",
      price: 45.0,
      quantity: 1,
    },
    {
      name: "Winter Falls",
      description:
        "Embrace the winter wonderland with 'Winter Falls,' an original acrylic painting. The landscape features waterfalls and snow-capped mountains, creating a scene of serene beauty.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "winter-mountains-waterfalls.png",
      price: 55.0,
      quantity: 1,
    },
  ]);
  //console log that lets us know that the subcategories have been seeded
  console.log("products seeded");

  process.exit();
});
