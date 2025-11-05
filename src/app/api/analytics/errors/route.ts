import { NextRequest, NextResponse } from "next/server";
import { apiRateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic"; // Analytics endpoints should always be dynamic
export const revalidate = 0;
import {
  CommonSchemas,
  createSuccessResponse,
  createErrorResponse,
} from "@/lib/api-validation";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = await apiRateLimit(request);
    if (rateLimitResponse.status !== 200) {
      return rateLimitResponse;
    }

    // Validate request body
    const body = await request.json();
    const validation = CommonSchemas.errorTracking.safeParse(body);

    if (!validation.success) {
      return createErrorResponse(
        "Invalid error data",
        400,
        validation.error.errors
      );
    }

    const errorData = validation.data;

    // Sanitize error messages in production
    if (process.env.NODE_ENV === "production") {
      // Log generic error (sanitized)
      console.error("Error tracked:", {
        message: errorData.message.substring(0, 200), // Limit length
        hasStack: !!errorData.stack,
        context: errorData.context?.substring(0, 100) || undefined,
        timestamp: errorData.timestamp || new Date().toISOString(),
      });

      // Send detailed error to external monitoring service
      // Example: Sentry, Bugsnag, LogRocket, etc.
      // await sendToErrorService({
      //   message: errorData.message,
      //   stack: errorData.stack,
      //   context: errorData.context,
      //   url: errorData.url,
      //   userAgent: errorData.userAgent,
      //   timestamp: errorData.timestamp,
      // });
    } else {
      // Development: full error details
      console.error("Error tracked:", {
        message: errorData.message,
        stack: errorData.stack,
        context: errorData.context,
        url: errorData.url,
        userAgent: errorData.userAgent,
        timestamp: errorData.timestamp,
      });
    }

    return createSuccessResponse({ message: "Error logged successfully" });
  } catch (error) {
    // Sanitize error in production
    if (process.env.NODE_ENV === "production") {
      console.error("Error processing error report");
    } else {
      console.error("Error processing error report:", error);
    }
    return createErrorResponse("Failed to process error report", 500);
  }
}
