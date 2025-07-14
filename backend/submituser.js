const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  interests: {
    type: [String],
    required: true,
    validate: {
      validator: arr => arr.length > 0,
      message: 'At least one interest is required.'
    }
  },
  likes: {
    type: [String],
    default: []
  },
  dislikes: {
    type: [String],
    default: []
  }
});

const User = mongoose.model('User', userSchema);

// === POST /users — create user ===
router.post('/', async (req, res) => {
  try {
    const { name, email, age, interests } = req.body;

    if (!name || !email || !age || !interests || interests.length === 0) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: 'User with this email already exists.' });
    }

    const newUser = new User({ name, email, age, interests });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// === POST /users/respond — approve or reject a candidate ===
router.post('/respond', async (req, res) => {
  try {
    const { email, targetEmail, action } = req.body;

    if (!email || !targetEmail || !['like', 'dislike'].includes(action)) {
      return res.status(400).json({ error: 'Invalid input.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    // Prevent duplicates
    if (action === 'like' && !user.likes.includes(targetEmail)) {
      user.likes.push(targetEmail);
    } else if (action === 'dislike' && !user.dislikes.includes(targetEmail)) {
      user.dislikes.push(targetEmail);
    }

    await user.save();
    res.json({ message: `User ${action}d successfully.` });
  } catch (err) {
    console.error('Error processing response:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// === GET /users/liked/:email — get all liked users ===
router.get('/liked/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const likedUsers = await User.find({ email: { $in: user.likes } });

    res.json(likedUsers);
  } catch (err) {
    console.error('Error fetching liked users:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/disliked/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const dislikedUsers = await User.find({ email: { $in: user.dislikes } });

    res.json(dislikedUsers);
  } catch (err) {
    console.error('Error fetching disliked users:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// === POST /users/clear-like — remove a user from likes[] ===
router.post('/clear-like', async (req, res) => {
  try {
    const { email, targetEmail } = req.body;

    if (!email || !targetEmail) {
      return res.status(400).json({ error: 'Email and targetEmail are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    user.likes = user.likes.filter(e => e !== targetEmail);
    await user.save();

    res.json({ message: 'Like cleared successfully.' });
  } catch (err) {
    console.error('Error clearing like:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// === POST /users/clear-dislike — remove a user from dislikes[] ===
router.post('/clear-dislike', async (req, res) => {
  try {
    const { email, targetEmail } = req.body;

    if (!email || !targetEmail) {
      return res.status(400).json({ error: 'Email and targetEmail are required.' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    user.dislikes = user.dislikes.filter(e => e !== targetEmail);
    await user.save();

    res.json({ message: 'Dislike cleared successfully.' });
  } catch (err) {
    console.error('Error clearing dislike:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});



// === GET /users/candidates/:email — get matching candidates ===
router.get('/candidates/:email', async (req, res) => {
  try {
    const { email } = req.params;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const allUsers = await User.find({ email: { $ne: email } });

    const candidates = allUsers
      .filter(other => {
        const common = other.interests.filter(i => user.interests.includes(i));
        return (
          common.length >= 1 &&
          !user.likes.includes(other.email) &&
          !user.dislikes.includes(other.email)
        );
      })
      .map(other => ({
        name: other.name,
        email: other.email,
        age: other.age,
        commonInterests: other.interests.filter(i => user.interests.includes(i))
      }));

    res.json(candidates);
  } catch (err) {
    console.error('Error fetching candidates:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

