import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

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
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      return done(null, { user, token });
    } catch (error) {
      return done(error);
    }
  })
);

const jwtOptions = {
  jwtFromRequest: (req) => {
    let token = null;
    if (req && req.cookies) {
      token = req.cookies.authToken;
    }
    return token;
  },
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findById(payload.userId);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
