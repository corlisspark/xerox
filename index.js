require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

mongoose.set("debug", true);
// connect to database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = Promise;

app.use(cors({ origin: "*" }));

const postRoutes = require("./routes/posts");
const categoryRoutes = require("./routes/categories");
const neighborhoodRoutes = require("./routes/neighborhoods");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function (req, res) {
//     res.send("Hello from the root route");
// })
app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/neighborhoods", neighborhoodRoutes);

// Quick seed endpoint for Railway
app.get("/seed-database", async (req, res) => {
  try {
    const db = require("./models");
    
    // Sample neighborhoods
    const neighborhoods = [
      { name: "Downtown", coordinates: { lat: 40.7484, lng: -73.9857 }, borough: "Manhattan", radius: 1000 },
      { name: "Uptown", coordinates: { lat: 40.7831, lng: -73.9712 }, borough: "Manhattan", radius: 1000 },
      { name: "Midtown", coordinates: { lat: 40.7549, lng: -73.9840 }, borough: "Manhattan", radius: 1000 },
      { name: "Brooklyn Heights", coordinates: { lat: 40.6962, lng: -73.9936 }, borough: "Brooklyn", radius: 1000 },
      { name: "Queens Village", coordinates: { lat: 40.7282, lng: -73.7949 }, borough: "Queens", radius: 1000 }
    ];

    // Sample categories
    const categories = [
      { name: "Electronics" }, { name: "Furniture" }, { name: "Vehicles" }, 
      { name: "Clothing" }, { name: "Sports & Recreation" }, { name: "Books & Media" },
      { name: "Home & Garden" }, { name: "Jobs" }, { name: "Services" }
    ];
    
    // Clear existing
    await db.Neighborhood.deleteMany({});
    await db.Category.deleteMany({});
    
    // Insert new data
    const createdNeighborhoods = await db.Neighborhood.insertMany(neighborhoods);
    const createdCategories = await db.Category.insertMany(categories);
    
    res.json({ 
      success: true, 
      neighborhoods: createdNeighborhoods.length,
      categories: createdCategories.length,
      message: "Database seeded successfully! You can now create posts."
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(process.env.PORT || 5000, function() {
  console.log("~ Starting the server ~");
});
