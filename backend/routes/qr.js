const QRCode = require('qrcode');
const express = require('express');
const router = express.Router();

router.get('/generate-qr', async (req, res) => {
    // The URL to encode in the QR code
    const qrData = `http://192.168.0.125:5001/franchise`;

  try {
    // Generate QR code as a Data URL
    const qrCode = await QRCode.toDataURL(qrData);
    res.send(`<img src="${qrCode}" alt="QR Code" />`); // Send as an HTML image
  } catch (err) {
    res.status(500).json({ message: 'Error generating QR code', error: err.message });
  }
});

module.exports = router;
