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
    const validation = CommonSchemas.resourceTracking.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Invalid resource data",
        400,
        validation.error.errors
      );
    }

    const resourceData = validation.data;

    // Log slow resources (in production, you'd send to your monitoring service)
    if (process.env.NODE_ENV === "production") {
      // Send to external service only
      // await sendToMonitoringService(resourceData);
    } else {
      console.warn("Slow resource detected:", {
        name: resourceData.name,
        duration: resourceData.duration,
        size: resourceData.size,
        timestamp: resourceData.timestamp,
      });
    }

    // Here you could send to external services like:
    // - Google Analytics
    // - Custom performance monitoring
    // - APM tools
    // - Alerting systems

    return createSuccessResponse({
      message: "Slow resource logged successfully",
    });
  } catch (error) {
    if (process.env.NODE_ENV === "production") {
      console.error("Error processing slow resource report");
    } else {
      console.error("Error processing slow resource report:", error);
    }
    return createErrorResponse("Failed to process slow resource report", 500);
  }
}
