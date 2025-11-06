import { envSchema } from './schemas';

// Validate environment variables at startup
export function validateEnv() {
  try {
    envSchema.parse(process.env);
    console.log('✓ Environment variables validated successfully');
  } catch (error) {
    console.error('❌ Invalid environment variables:', error);
    throw new Error('Invalid environment configuration');
  }
}

// Helper to get validated env vars
export function getEnv() {
  return envSchema.parse(process.env);
}
