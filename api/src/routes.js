import { Router } from 'express';
import ensureAuthenticated from './middlewares/ensureAuthenticated.js';
import * as users from './controllers/users.js';
import * as auth from './controllers/auth.js';
import * as addresses from './controllers/addresses.js';
import * as timeslots from './controllers/timeslots.js';
import * as machines from './controllers/machines.js';

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
router.post('/auth/topup', ensureAuthenticated, auth.topUpBalance);

// Users
router.route('/users')
  .get(users.findAll);
router.route('/users/:userId')
  .get(users.findOne);

// Machines
router.route('/machines')
  .get(machines.findAll)
  .post(ensureAuthenticated, machines.create);
router.route('/machines/:machineId').get(machines.getOne);

// Addresses
router.route('/addresses')
  .get(ensureAuthenticated, addresses.getPersonalAddresses)
  .post(ensureAuthenticated, addresses.createPersonalAddress);
router.route('/addresses/:addressId')
  .get(ensureAuthenticated, addresses.getPersonalAddressById)
  .delete(ensureAuthenticated, addresses.removePersonalAddress)

// Timeslots
router.route('/timeslots')
  .get(timeslots.getCurrentReservations)
router.route('/timeslots/performreservation')
.post(ensureAuthenticated, timeslots.makeReservation);

router.route('/timeslots/:machineId')
  .get(timeslots.getScheduleForMachine);
