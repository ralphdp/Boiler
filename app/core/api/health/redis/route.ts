import { NextResponse } from 'next/server';
import redis from '@/lib/core/redis/client';

export async function GET() {
  try {
    // Ping Redis to check connectivity
    const response = await redis.ping();
    
    if (response === 'PONG') {
      return NextResponse.json({
        status: 'healthy',
        redis: 'connected',
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        status: 'unhealthy',
        redis: 'disconnected',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        redis: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

