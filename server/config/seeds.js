//importing our database connection
const db = require("./connection");
const { User, Product, Category, SubCategory } = require("../models");

db.once("open", async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { categoryName: "Originals", categoryImage: "originals.jpeg" },
    { categoryName: "Prints", categoryImage: "prints.jpeg" },
    { categoryName: "Art Commissions", categoryImage: "commissions.JPG" },
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
      name: "Billie Eilish Portrait",
      description:
        "This original portrait is of singer song writer Billie Eilish. This piece was made only using penicl, pen and ink.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      images: "billie-eilish.jpeg",
      price: 45.0,
      quantity: 1,
    },
    {
      name: "Canyon at Dusk",
      description:
        "This original landscape depcits a river running through a canyon at dusk. It was created using oil paints on canvas.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      images: "canyon-river-dusk.JPG",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Death to Life",
      description:
        "Experience the profound journey of transformation with our art print titled 'Death to Life.' Created with a captivating blend of pen, ink, and watercolor, this piece skillfully captures the essence of rebirth after a traumatic experience. As you gaze upon the intricate details and dynamic interplay of shades, you'll find the artist's representation of the metamorphosis from darkness to light. The use of pen and ink adds a sense of permanence to the delicate watercolor, echoing the strength that emerges from life's struggles. 'Death to Life' serves as a poignant reminder that, like the ebb and flow of the artist's strokes, life has its intricate moments of both chaos and serenity. Hang this print in your space to evoke contemplation and inspire a renewed sense of hope, resilience, and the beauty that arises from overcoming adversity. Embrace the symbolism of rebirth and transformation with 'Death to Life' — a striking addition to any art collection that speaks to the resilience of the human spirit.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "death-to-life.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Elegant Elephant",
      description: "Watercolor on cold pressed paper and dimensions",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "elephant.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Feeling Pine",
      description: "Pen and Ink on cold pressed paper and dimensions",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "feeling-pine.jpeg",
      price: 75.0,
      quantity: 1,
    },
    {
      name: "Bottom of the Canyon",
      description: "Pen and Ink on cold pressed paper and dimensions",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      images: "grand-canyon-oil.jpeg",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Bright Angel Trail",
      description: "Acrylic on canvas and dimensions",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "grand-canyon-watercolor.jpeg",
      price: 115.0,
      quantity: 1,
    },
    {
      name: "Humphrey's Peak",
      description: "Print of Humphrey's peak in flagstaff AZ. Made with watercolor, pen and ink.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "humphrey's-peak.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "In the Inlet",
      description: "Oil painting print of an inlet with glaciers in the background",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "inlet.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "On the Edge",
      description: "Oil painting of a single pine tree near the bank of a waterfall. print.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "leaning-pine.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Lone Mesa",
      description: "Print of oil painting. Depcits a desert landscape with a single mesa.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "lone-mesa.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Man Sitting",
      description: "Original piece. Pen and ink portrait of a man. 5 shades of Cross-hatching implemented.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      images: "man-portrait.jpeg",
      price: 85.0,
      quantity: 1,
    },
    {
      name: "A Hike to remember",
      description: "Print. Watercolor, pen and ink. A desert landscape where to people off in the distance sit under a mesquite tree and look out in the distance.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "mother-son.jpg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Branching Out || Black and White",
      description: "Print. Pen and ink. A giant oak tree with many huge branches.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[2]._id,
      images: "oak-black-and-white.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Branching Out || Color",
      description: "Print. Watercolor, Pen and ink. A giant oak tree with many huge branches.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "oak-color.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Family Outing",
      description: "Print. Watercolor, Pen and ink. A family with their dog out at a park.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "park-bench.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Those Eyes",
      description: "Print. Watercolor, Pen and ink. A portrait of a woman with a piercing stare.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "portrait-color.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Purple Mountains",
      description: "Print. Watercolor, Pen and ink. A portrait of a woman with a piercing stare.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[0]._id,
      images: "purple-mountains.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Feeling Blessed, Never Stressed",
      description: "Print. Watercolor, Pen and ink. A manatee relaxes in a pool of waterfalls almost resembelling a bath house.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "relaxed-manatee.jpeg",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Rebel Scum",
      description: "Print. Watercolor, Pen and ink. Starwars rebel fighter floats with a X wing in the background.",
      categoryID: categories[1]._id,
      subCategoryID: subCategories[1]._id,
      images: "starwars.JPG",
      price: 25.0,
      quantity: 20,
    },
    {
      name: "Very Superstitious",
      description: "Original. Watercolor, Pen and ink. A landscape of the Superstition Mountain as seen from Lost Dutchman State park range.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "superstitions.jpeg",
      price: 125.0,
      quantity: 1,
    },
    {
      name: "Tall Waterfalls and Perilous Peaks",
      description: "Original. Oil. Landscape of a large waterfalls with jagged peaks in the background.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[0]._id,
      images: "tall-falls.JPG",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "To Rule Them All",
      description: "Original. Pen and Ink. Sauron from the Lord of the Rings and the One Ring.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[2]._id,
      images: "to-rule-them-all.jpeg",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Off the Coast",
      description: "Original. Watercolor Pen and Ink. Seagulls fly around pine trees off the coast of somewhere.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "watercolor-pine.jpeg",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Golden Hour",
      description: "Original. Acrylic. Purple Mountains, cotton candy clouds and a golden hue over the forest and stream in this landscape.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[3]._id,
      images: "waterfall-at-sunset.JPG",
      price: 65.0,
      quantity: 1,
    },
    {
      name: "Weaver's Needle",
      description: "Original. Watercolor, pen and ink. Landscape of Weaver's Needle located in AZ.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "weavers-needle.JPG",
      price: 45.0,
      quantity: 1,
    },
    {
      name: "Winter Falls",
      description: "Original. Acrylic. Landscape of Waterfalls and snowcapped mountains in Winter.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "winter-mountains-waterfalls.png",
      price: 55.0,
      quantity: 1,
    },
    {
      name: "Woman Sitting",
      description: "Original. Pen and Ink. Portrait of a nude model using cross-hatching and dry brushing techniques.",
      categoryID: categories[0]._id,
      subCategoryID: subCategories[1]._id,
      images: "woman-portrait.jpeg",
      price: 55.0,
      quantity: 1,
    },
  ]);
  //console log that lets us know that the subcategories have been seeded
  console.log("products seeded");

  process.exit();
});
