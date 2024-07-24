const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query('SELECT * FROM "users" WHERE id = $1', [id]);
    const user = result && result.rows && result.rows[0];
    if (user) {
      delete user.password_hash; // Remove password hash for security
      done(null, user);
    } else {
      done(null, null);
    }
  } catch (error) {
    console.log('Error during deserialization', error);
    done(error, null);
  }
});

// Local Strategy
passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    ((email, password, done) => {
      console.log('Attempting to authenticate user:', email);
      pool
        .query('SELECT * FROM "users" WHERE email = $1', [email])
        .then((result) => {
          // console.log('Query result:', result.rows);
          const user = result && result.rows && result.rows[0];
          if (user) {
            // console.log('User found, comparing passwords');
            if (encryptLib.comparePassword(password, user.password_hash)) {
              // console.log('Password match, authentication successful');
              done(null, user);
            } else {
              console.log('Password mismatch');
              done(null, null);
            }
          } else {
            console.log('User not found');
            done(null, null);
          }
        })
        .catch((error) => {
          console.log('Error with query for user ', error);
          done(error, null);
        });
    })
  )
);

// Google Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [profile.id]);
    if (result.rows.length) {
      done(null, result.rows[0]);
    } else {
      const newUser = await pool.query(
        'INSERT INTO users (email, first_name, last_name, google_id, profile_pic_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [profile.emails[0].value, profile.name.givenName, profile.name.familyName, profile.id, profile._json.picture]
      );
      done(null, newUser.rows[0]);
    }
  } catch (error) {
    console.error('Error during Google strategy authentication:', error);
    done(error, null);
  }
}));

module.exports = passport;
