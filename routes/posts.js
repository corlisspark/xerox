const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require('mongoose');

router.get('/', function (req, res) {
    const limit = req.query.loadrecent ? parseInt(req.query.loadrecent) : 999;
    const { category, postIds } = req.query;
    const query = {};

    if (category) {
        query.category = category;
    }

    if (postIds) {
        query._id = {
            $in: postIds.split(',').map((postId) => mongoose.Types.ObjectId(postId))
        }
    }

    db.Post.find(query).sort({ _id: -1 }).limit(limit)
        .then(function (posts) {
            res.json(posts);
        })
        .catch(function (err) {
            res.send(err);
        })
});

router.post('/', async (req, res) => {
    try {
        console.log('Creating post with data:', req.body);
        
        const neighborhood = await db.Neighborhood.findOne({ name: req.body.location });
        console.log('Found neighborhood:', neighborhood);
        
        if (!neighborhood) {
            return res.status(400).json({ 
                error: `Neighborhood '${req.body.location}' not found. Available neighborhoods need to be seeded.` 
            });
        }
        
        const price = req.body.price || 0;
        
        const newPost = await db.Post.create({ 
            ...req.body, 
            neighborhood: neighborhood._id, 
            price: price 
        });
        
        console.log('Created post:', newPost);
        res.status(201).json(newPost);
        
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).json({ error: err.message, details: err });
    }
});

router.get('/:postId', async (req, res) => {
    try {
        const foundPost = await db.Post.findById(req.params.postId)
        const neighborhood = await db.Neighborhood.findById(foundPost.neighborhood);

        res.json({ ...foundPost._doc, neighborhood: neighborhood });
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
