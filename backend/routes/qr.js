const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.get('/generate', async (req, res) => {
    const { restaurantId, tableNumber } = req.query;
    if (!restaurantId || !tableNumber) {
        return res.status(400).send('Missing restaurantId or tableNumber');
    }
    const url = `https://yourapp.com?restaurantId=${restaurantId}&table=${tableNumber}`;
    try {
        const qrCode = await QRCode.toDataURL(url);
        res.status(200).json({ qrCode });
    } catch (error) {
        res.status(500).send('Error generating QR code');
    }
});

module.exports = router;
