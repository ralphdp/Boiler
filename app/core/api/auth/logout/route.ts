import { successResponse } from '@/lib/core/utils/api-response';

export async function POST() {
  try {
    // TODO: Destroy session with Passport.js
    // For now, return success
    return successResponse({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return successResponse({
      message: 'Logout successful',
    });
  }
}
