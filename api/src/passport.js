import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import { db } from './database.js';

passport.use('local', new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async (emailOrUsername, password, done) => {
    const user = await db.user.findFirst({
      where: {
        OR: [
          { email: emailOrUsername },
          { username: emailOrUsername },
        ],
      },
    });

    if (!user)
      return done(null, null, { message: 'Unknown user.' });

    if (await bcrypt.compare(password, user.password))
      return done(null, user);
    return done(null, null, { message: 'Unknown user.' });
  }));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => {
  db.user.findUnique({ where: { id } })
    .then((user) => done(null, user))
    .catch((err) => done(err));
});
