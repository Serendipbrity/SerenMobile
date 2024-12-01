const express = require('express');
const { Franchise, Location, MenuItem } = require('../models/Franchise');
const router = express.Router();

// *********** Franchise Routes *****************************************

// ------- working ------
// Get ALL Franchises 
// /franchise
router.get('/franchise', async (req, res) => {
  try {
    // franchises will always have locations but currently they dont have to have menus
    const franchise = await Franchise.find().populate('locations').populate({ path:'menus', strictPopulate: false });
    if (!franchise) return res.status(404).json({ message: 'Franchise not found' });
    res.status(200).json(franchise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------- working ------
// Get ONE Franchise by ID 
// /franchise/:id
router.get('/franchise/:id', async (req, res) => {
  try {
    const franchise = await Franchise.findById(req.params.id);
    if (!franchise) return res.status(404).json({ message: 'Franchise not found' });
    res.status(200).json(franchise);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ------- working ------
// Create a New Franchise 
// /franchise
router.post('/franchise', async (req, res) => {
  try {
      // Create a new Franchise
      const franchise = new Franchise(req.body);

      // Set franchiseId for each location
      franchise.locations.forEach(location => {
          location.franchiseId = franchise._id; // Automatically assign the parent franchise _id
          
          location.menu.forEach(menu => {
            menu.franchiseId = franchise._id;
          });
    });

      // Save the Franchise
      const savedFranchise = await franchise.save();
      res.status(201).json(savedFranchise);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});




// ******** Location Routes ***************************

// ------- working ------ remove need for franchiseId?
// Get single Location within a Franchise
// /franchise
router.get('/franchise/:franchiseId/location/:locationId', async (req, res) => {
  try {
    const { franchiseId, locationId } = req.params;

    const locations = await Franchise.findById(franchiseId).populate('locations').populate({ path:'menus', strictPopulate: false });
    if (!locations) return res.status(404).json({ message: 'Locations not found' });
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ******** Menu Routes ***************************

//  Menu at Location 
// /franchise/: franchiseId / location /: locationId / menu
router.get('/franchise/:franchiseId/location/:locationId/menu', async (req, res) => {
  try {
      const { franchiseId, locationId } = req.params;

      const franchise = await Franchise.findById(franchiseId);
      if (!franchise) return res.status(404).json({ message: 'Franchise not found' });

      const menus = franchise.menus.filter(menu =>
          menu.locationId === null || menu.locationId.toString() === locationId
      );

      res.status(200).json(menus);
  } catch (err) {
      res.status(500).json({ message: 'Error fetching menus', error: err.message });
  }
});




module.exports = router;
