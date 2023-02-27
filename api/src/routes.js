import { Router } from 'express';
import ensureAuthenticated from './middlewares/ensureAuthenticated.js';
import * as users from './controllers/users.js';
import * as auth from './controllers/auth.js';

export const router = Router();

// API root
router.get('/', (_req, res) => {
  res.json({ message: "Welcome to WashConnect! There's nothing here..." });
});

// Authentication
router.post('/auth/login', auth.logIn, ensureAuthenticated, auth.me);
router.post('/auth/register', auth.register)
router.get('/auth/me', ensureAuthenticated, auth.me);
router.post('/auth/logout', ensureAuthenticated, auth.logOut);

// Users
router.route('/users')
  .get(users.findAll);
router.route('/users/:userId')
  .get(users.findOne);
