import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { verifyPassword } from './password';
import prisma from '../prisma';

// Configure Passport Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Check if email is verified
        if (!user.isVerified) {
          return done(null, false, { message: 'Please verify your email before logging in' });
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
          return done(null, false, { message: 'Invalid email or password' });
        }

        // Return user object (without password)
        return done(null, {
          id: user.id,
          email: user.email,
          name: user.name,
          isVerified: user.isVerified,
          mfaEnabled: user.mfaEnabled,
        });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user for session
passport.serializeUser((user: Express.User, done) => {
  done(null, (user as { id: string }).id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        isVerified: true,
        mfaEnabled: true,
        mfaMethod: true,
      },
    });

    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
