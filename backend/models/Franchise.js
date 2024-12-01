const mongoose = require('mongoose');

// Each Menu Item Schema (can update one item on all menus (locations) or one menu )
const MenuItemSchema = new mongoose.Schema({
    name: { type: String, required: true }, // example: Burger
    price: { type: Number, required: true },
    description: { type: String },
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: null }, // Null for franchise-wide menu
  franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise' } 
});

// Location Schema
const LocationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String },
  // tables: { type: Number, default: 15 },
    menu: [MenuItemSchema], // All menu items for this location
    franchiseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Franchise', default: null} // which franchise this location belongs to, if any
});

// Restaurant (Franchise) Schema
const FranchiseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String },
    themeColor: { type: String, default: '#ffffff' },
    menu: [MenuItemSchema], // All menus for the franchise
    locations: [LocationSchema] // Location details for the franchise
});

module.exports = {
  MenuItem: mongoose.model('MenuItem', MenuItemSchema),
  Location: mongoose.model('Location', LocationSchema),
  Franchise: mongoose.model('Franchise', FranchiseSchema)
};

