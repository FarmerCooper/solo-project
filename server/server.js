const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const coordsRouter = require('./routes/coords.router');
const infoRouter = require('./routes/info.router');
const photosRouter = require('./routes/photos.router');
const allDataRouter = require('./routes/restaurantData.router');
const favoritesRouter = require('./routes/favorites.router');
const droolRouter = require('./routes/drools.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/coordinates', coordsRouter);
app.use('/api/info', infoRouter);
app.use('/api/photos', photosRouter);
app.use('/allData', allDataRouter);
app.use('/userFavorites', favoritesRouter);
app.use('/userDrools', droolRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
