const express = require('express');
const { auth } = require('../middleware/auth');

const router = express.Router();

// In-memory cart storage (in production, use Redis or database)
const userCarts = new Map();

// Get cart
router.get('/', auth, (req, res) => {
  const cart = userCarts.get(req.user.id) || [];
  res.json(cart);
});

// Add to cart
router.post('/add', auth, (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;
    
    let cart = userCarts.get(userId) || [];
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    
    userCarts.set(userId, cart);
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update cart item
router.put('/update', auth, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;
    
    let cart = userCarts.get(userId) || [];
    const item = cart.find(item => item.productId === productId);
    
    if (item) {
      if (quantity <= 0) {
        cart = cart.filter(item => item.productId !== productId);
      } else {
        item.quantity = quantity;
      }
      userCarts.set(userId, cart);
    }
    
    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Remove from cart
router.delete('/remove/:productId', auth, (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;
    
    let cart = userCarts.get(userId) || [];
    cart = cart.filter(item => item.productId !== productId);
    userCarts.set(userId, cart);
    
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;