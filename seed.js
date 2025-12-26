require("dotenv").config();
const mongoose = require("mongoose");
const db = require("./models");

// Connect to database
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Sample neighborhoods
const neighborhoods = [
  {
    name: "Downtown",
    coordinates: { lat: 40.7484, lng: -73.9857 },
    borough: "Manhattan",
    radius: 1000
  },
  {
    name: "Uptown", 
    coordinates: { lat: 40.7831, lng: -73.9712 },
    borough: "Manhattan",
    radius: 1000
  },
  {
    name: "Midtown",
    coordinates: { lat: 40.7549, lng: -73.9840 },
    borough: "Manhattan", 
    radius: 1000
  },
  {
    name: "Brooklyn Heights",
    coordinates: { lat: 40.6962, lng: -73.9936 },
    borough: "Brooklyn",
    radius: 1000
  },
  {
    name: "Queens Village",
    coordinates: { lat: 40.7282, lng: -73.7949 },
    borough: "Queens",
    radius: 1000
  }
];

// Sample categories
const categories = [
  { name: "Electronics" },
  { name: "Furniture" },
  { name: "Vehicles" },
  { name: "Clothing" },
  { name: "Sports & Recreation" },
  { name: "Books & Media" },
  { name: "Home & Garden" },
  { name: "Jobs" },
  { name: "Services" }
];

async function seedDatabase() {
  try {
    console.log('Seeding database...');
    
    // Clear existing data
    await db.Neighborhood.deleteMany({});
    await db.Category.deleteMany({});
    await db.Post.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert neighborhoods
    const createdNeighborhoods = await db.Neighborhood.insertMany(neighborhoods);
    console.log(`Created ${createdNeighborhoods.length} neighborhoods`);
    
    // Insert categories  
    const createdCategories = await db.Category.insertMany(categories);
    console.log(`Created ${createdCategories.length} categories`);
    
    console.log('✅ Database seeded successfully!');
    
    // Close connection
    mongoose.connection.close();
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    mongoose.connection.close();
  }
}

seedDatabase();