import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { db } from './database.js';

passport.use('local', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  (emailOrUsername, password, done) => {
    // 1. Get account by email or username
    // 2. Check password with bcrypt
    //   * correct: return user
    //   * incorrect: return error
  }));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  // Get user by id and return it
});
