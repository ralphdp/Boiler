import { NextRequest, NextResponse } from "next/server";
import { apiRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic"; // Analytics endpoints should always be dynamic
export const revalidate = 0;
import {
  CommonSchemas,
  createSuccessResponse,
  createErrorResponse,
} from "@/lib/api-validation";

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await apiRateLimit(request);
    if (rateLimitResponse.status !== 200) {
      return rateLimitResponse;
    }

    // Validate request body
    const body = await request.json();
    const validation = CommonSchemas.performanceTracking.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Invalid performance data",
        400,
        validation.error.errors
      );
    }

    const performanceData = validation.data;

    // Log performance metrics (in production, you'd send to your analytics service)
    if (process.env.NODE_ENV === "production") {
      // Send to external service only
      // await sendToAnalyticsService(performanceData);
    } else {
      console.log("Performance metric received:", {
        name: performanceData.name,
        duration: performanceData.duration,
        timestamp: performanceData.timestamp,
      });
    }

    // Here you could send to external services like:
    // - Google Analytics
    // - Mixpanel
    // - Custom performance monitoring
    // - APM tools like New Relic

    return createSuccessResponse({
      message: "Performance metric recorded successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error processing performance metric");
    } else {
      console.error("Error processing performance metric:", error);
    }
    return createErrorResponse("Failed to process performance metric", 500);
  }
}
