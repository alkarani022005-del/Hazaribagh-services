const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Service = require('../models/Service');

router.get('/', async (req, res, next) => {
  try {
    const { serviceId } = req.query;
    if (!serviceId) return res.status(400).json({ message: 'serviceId required' });
    const reviews = await Review.find({ service: serviceId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body);
    const all = await Review.find({ service: req.body.service });
    const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;
    await Service.findByIdAndUpdate(req.body.service, { avgRating: Math.round(avg * 10) / 10, totalReviews: all.length });
    res.status(201).json(review);
  } catch (err) { next(err); }
});

module.exports = router;
