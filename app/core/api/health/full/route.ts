import { NextResponse } from 'next/server';
import prisma from '@/lib/core/prisma';
import redis from '@/lib/core/redis/client';

export async function GET() {
  const checks = {
    database: { status: 'unknown', message: '' },
    redis: { status: 'unknown', message: '' },
  };

  // Check database
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.database = { status: 'healthy', message: 'connected' };
  } catch (error) {
    checks.database = {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Check Redis
  try {
    const response = await redis.ping();
    if (response === 'PONG') {
      checks.redis = { status: 'healthy', message: 'connected' };
    } else {
      checks.redis = { status: 'unhealthy', message: 'no pong response' };
    }
  } catch (error) {
    checks.redis = {
      status: 'unhealthy',
      message: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  const allHealthy = Object.values(checks).every((check) => check.status === 'healthy');

  return NextResponse.json(
    {
      status: allHealthy ? 'healthy' : 'unhealthy',
      checks,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
    { status: allHealthy ? 200 : 503 }
  );
}

