import 'dotenv/config';
import './passport.js';
import './database.js';

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { ZodError } from 'zod';
import { router } from './routes.js';
import { db } from './database.js';

const app = express();
app.use(helmet()); // Secure the app against common web vulnerabilities
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 15 * 24 * 3600 * 1000, // 15 days
  },
  store: new PrismaSessionStore(db, { checkPeriod: 2 * 60 * 1000 }),
}));
app.use(passport.initialize());
app.use(passport.session());

// Logger middleware
app.use((req, _res, next) => {
  console.log(`New request: ${req.method} ${req.url}`);
  next();
});

// Register all our routes (defined in the routes.js file)
app.use('/', router);

// 404 Handler (if we arrive up to this middleware, it means that the route was not found,
// because middlewares are executed in order).
app.use((_req, res) => {
  res.status(404).send('Not Found');
});

// Error handler. It knows it's an error handler because it has 4 arguments.
app.use((err, _req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400).json({ message: 'Invalid body', errors: err.errors });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const port = process.env.PORT ?? 5050;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
