import session from 'express-session';
import { RedisStore } from 'connect-redis';
import redis from '../redis/client';

export const sessionConfig: session.SessionOptions = {
  store: new RedisStore({
    client: redis,
    prefix: 'sess:',
  }),
  secret: process.env.SESSION_SECRET || 'change-this-secret-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
  },
  name: 'sessionId',
};
