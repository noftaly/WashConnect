import { Router } from 'express';
import ensureAuthenticated from './middlewares/ensureAuthenticated.js';
import * as users from './controllers/users.js';
import * as auth from './controllers/auth.js';
import * as testing from './controllers/testing.js';
import * as addresses from './controllers/addresses.js';
import * as timeslots from './controllers/timeslots.js';

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

router.get('/testing', ensureAuthenticated, testing.find);

// Addresses
router.route('/addresses')
  .get(ensureAuthenticated, addresses.getPersonalAddresses)
  .post(ensureAuthenticated, addresses.createPersonalAddress);
router.route('/addresses/:addressId')
  .get(ensureAuthenticated, addresses.getPersonalAddressById)
  .delete(ensureAuthenticated, addresses.removePersonalAddress)

// Timeslots
router.route('/timeslots')
  .get(ensureAuthenticated, timeslots.getCurrentReservations)
  .post(ensureAuthenticated, timeslots.makeReservation);
router.route('/timeslots/:machineId')
  .get(timeslots.getScheduleForMachine);
