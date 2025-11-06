import { NextResponse } from 'next/server';

export function successResponse<T>(data: T, status: number = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function errorResponse(error: string, status: number = 400, code?: string) {
  return NextResponse.json(
    {
      success: false,
      error,
      ...(code && { code }),
    },
    { status }
  );
}

export function validationErrorResponse(errors: Record<string, string>) {
  return NextResponse.json(
    {
      success: false,
      error: 'Validation failed',
      code: 'VALIDATION_ERROR',
      errors,
    },
    { status: 400 }
  );
}

export function unauthorizedResponse(message: string = 'Unauthorized') {
  return errorResponse(message, 401, 'UNAUTHORIZED');
}

export function forbiddenResponse(message: string = 'Forbidden') {
  return errorResponse(message, 403, 'FORBIDDEN');
}

export function notFoundResponse(message: string = 'Not found') {
  return errorResponse(message, 404, 'NOT_FOUND');
}

export function rateLimitResponse(message: string = 'Too many requests') {
  return errorResponse(message, 429, 'RATE_LIMIT_EXCEEDED');
}

export function serverErrorResponse(message: string = 'Internal server error') {
  return errorResponse(message, 500, 'INTERNAL_SERVER_ERROR');
}
