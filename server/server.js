const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const { setupSocket } = require('./services/setupSocket');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

setupSocket(io);



// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const chatRouter = require('./routes/chat.router');
const preferencesRouter = require('./routes/preferences.router');
const faqRouter = require('./routes/faq.router.js');
const childrenRouter = require('./routes/children.router');
const followupRouter = require('./routes/followup.router');
const notificationsRouter = require('./routes/notifications.router.js')


// Express Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('build'));
// CORS Configuration
app.use(cors());

// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);

//Check Server is Running
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/preferences', preferencesRouter);
app.use('/api/faq', faqRouter);
app.use('/api/child', childrenRouter);
app.use('/api/followup', followupRouter);
app.use('/api/notifications', notificationsRouter)



// Listen Server & Port
server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
