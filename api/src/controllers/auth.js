import bcrypt from 'bcrypt';
import passport from 'passport';
import { db } from '../database.js';
import { safeUser } from '../utils/safeUser.js';
import { createUser, loginUser } from '../validators/auth.js';

export async function logIn(req, res, next) {
  const { success, error } = loginUser.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  passport.authenticate('local', { successMessage: 'Logged In' })(req, res, next);
}

export async function register(req, res, next) {
  const { success, data, error } = createUser.safeParse(req.body);
  if (!success) {
    next(error);
    return;
  }

  const existingUser = await db.user.findFirst({
    where: {
      OR: [
        { email: data.email },
        { username: data.username },
        { phoneNumber: data.phoneNumber },
      ]
    },
  });

  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const password = await bcrypt.hash(data.password, 10);
  const user = await db.user.create({
    data: {
      ...data,
      password,
    },
  });

  res.status(201).json(safeUser(user));
}

export async function me(req, res) {
  res.status(200).json(safeUser(req.user));
}

export async function logOut(req, res) {
  req.logOut((err) => {
    if (err)
      res.status(500).json({ message: 'Error logging out' });
    else
      res.status(200).json({ message: 'Logged Out' });
  });
}
