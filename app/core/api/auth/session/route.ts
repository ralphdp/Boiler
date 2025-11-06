import { getSession } from '@/lib/core/auth/session';
import { successResponse } from '@/lib/core/utils/api-response';

export async function GET() {
  try {
    const session = await getSession();

    return successResponse({
      authenticated: !!session,
      user: session || null,
    });
  } catch (error) {
    console.error('Session error:', error);
    return successResponse({
      authenticated: false,
      user: null,
    });
  }
}
