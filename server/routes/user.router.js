const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Function to verify Google token
async function verifyGoogleToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.post('/google', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { sub, email, name, picture } = ticket.getPayload();

    let user = await pool.query('SELECT * FROM users WHERE google_id = $1', [sub]);

    if (!user.rows.length) {
      const insertUserText = `INSERT INTO users (email, first_name, last_name, google_id, profile_pic_url)
                              VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, profile_pic_url`;
      const values = [email, name.split(' ')[0], name.split(' ')[1], sub, picture];
      const result = await pool.query(insertUserText, values);
      user = result.rows[0];
    } else {
      user = user.rows[0];
    }

    // Log in the user
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to log in after Google authentication' });
      }
      res.json({ user });
    });
  } catch (error) {
    console.error('Error with Google login:', error);
    res.status(500).send({ error: 'Google login failed' });
  }
});

// Handles POST request with new user data
router.post('/register', async (req, res, next) => {
  const email = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  try {
    const queryText = `INSERT INTO "users" (email, password_hash) VALUES ($1, $2) RETURNING *`;
    const result = await pool.query(queryText, [email, password]);
    const newUser = result.rows[0];
    
    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
      res.json({ user: newUser });
    });
  } catch (err) {
    console.log('User registration failed: ', err);
    res.sendStatus(500);
  }
});



// Handles login form authenticate/login POST
router.post('/login', (req, res, next) => {
  console.log('Login attempt for user:', req.body.username); // Log the username
  userStrategy.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('Error in authentication:', err);
      return next(err);
    }
    if (!user) {
      console.log('Authentication failed. Info:', info);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.login(user, (err) => {
      if (err) {
        console.log('Error in req.login:', err);
        return next(err);
      }
      console.log('User logged in successfully:', user.email);
      return res.json({ user });
    });
  })(req, res, next);
});

// clear all server session information about this user
router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.sendStatus(200);
  });
});

module.exports = router;
