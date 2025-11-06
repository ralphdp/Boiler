import { cookies } from 'next/headers';

export interface Session {
  userId: string;
  email: string;
  isVerified: boolean;
  mfaVerified?: boolean;
}

export async function getSession(): Promise<Session | null> {
  // This is a placeholder - will be implemented with Passport.js
  const sessionCookie = (await cookies()).get('session');
  
  if (!sessionCookie) {
    return null;
  }

  try {
    // TODO: Implement proper session deserialization with Passport.js
    return JSON.parse(sessionCookie.value);
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<Session> {
  const session = await getSession();
  
  if (!session) {
    throw new Error('Unauthorized');
  }

  return session;
}

