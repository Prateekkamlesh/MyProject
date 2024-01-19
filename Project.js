const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const profileTimeout = 15000; // 15 seconds

// Sample in-memory data (replace this with a database in a real application)
const users = [
  { id: 1, name: 'User 1', age: 25, bio: 'Hello, I am User 1.', imageUrl: 'user1.jpg', visibleUntil: 0 },
  { id: 2, name: 'User 2', age: 28, bio: 'Nice to meet you! I am User 2.', imageUrl: 'user2.jpg', visibleUntil: 0 },
  // ... add more users
];

// Middleware
app.use(bodyParser.json());

// API endpoint to get a visible user profile
app.get('/api/user', (req, res) => {
  const userId = findVisibleUser();
  if (userId !== -1) {
    res.json(users[userId]);
  } else {
    res.json({ message: 'No visible profiles at the moment.' });
  }
});

// API endpoint to like a user
app.post('/api/like/:userId', (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  // Logic to handle liking a user (add to a liked list, check for matches, etc.)
  // Replace this with your actual logic for matching users
  res.json({ message: `Liked user with ID ${userId}` });
});

// Function to find the next visible user
function findVisibleUser() {
  const currentTime = Date.now();
  for (let i = 0; i < users.length; i++) {
    if (users[i].visibleUntil < currentTime) {
      users[i].visibleUntil = currentTime + profileTimeout;
      return i;
    }
  }
  return -1; // No visible user found
}

// Run the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
