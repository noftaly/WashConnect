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



// Addresses route
router.get('/addresses', ensureAuthenticated, addresses.getPersonalAddresses);
router.get('/addresses/:addressId', ensureAuthenticated, addresses.getPersonalAddressById);
router.post('/addresses', ensureAuthenticated, addresses.createPersonalAddress);
router.delete('/addresses/:addressId', ensureAuthenticated, addresses.removePersonalAddress)

router.get('/timeslot/:machineId', timeslots.getScheduleForMachine)
router.post('/timeslot/makereservation', ensureAuthenticated, timeslots.makeReservation)
router.get('/timeslot', ensureAuthenticated, timeslots.getCurrentReservations)