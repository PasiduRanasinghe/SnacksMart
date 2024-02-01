import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.model.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect email or password.',
        });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

export default passport;
