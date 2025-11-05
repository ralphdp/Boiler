import { NextRequest, NextResponse } from "next/server";
import { z, ZodSchema, ZodError } from "zod";

export interface ValidationConfig {
  body?: ZodSchema;
  query?: ZodSchema;
  headers?: ZodSchema;
}

export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  errors?: string[];
}

export async function validateRequest<T = any>(
  request: NextRequest,
  config: ValidationConfig
): Promise<ValidationResult<T>> {
  const errors: string[] = [];
  const validatedData: any = {};

  try {
    // Validate body if schema provided
    if (config.body) {
      let body = {};
      try {
        body = await request.json();
      } catch (e) {
        // If body parsing fails, body stays as empty object
        // This will be caught by Zod validation
      }
      const bodyResult = config.body.parse(body);
      validatedData.body = bodyResult;
    }

    // Validate query parameters
    if (config.query) {
      const queryParams = Object.fromEntries(request.nextUrl.searchParams);
      const queryResult = config.query.parse(queryParams);
      validatedData.query = queryResult;
    }

    // Validate headers
    if (config.headers) {
      const headers = Object.fromEntries(request.headers.entries());
      const headersResult = config.headers.parse(headers);
      validatedData.headers = headersResult;
    }

    // Combine all validated data
    const data =
      Object.keys(validatedData).length > 0
        ? {
            ...validatedData.body,
            ...validatedData.query,
            ...validatedData.headers,
          }
        : validatedData.body ||
          validatedData.query ||
          validatedData.headers ||
          {};

    return { success: true, data: data as T };
  } catch (error) {
    if (error instanceof ZodError) {
      errors.push(
        ...error.errors.map((err) => `${err.path.join(".")}: ${err.message}`)
      );
    } else {
      errors.push("Validation failed");
    }
    return { success: false, errors };
  }
}

export function createValidatedApiHandler<T = any>(
  config: ValidationConfig,
  handler: (request: NextRequest, validatedData: T) => Promise<NextResponse>
) {
  return async function validatedHandler(request: NextRequest) {
    const validation = await validateRequest<T>(request, config);

    if (!validation.success) {
      return new NextResponse(
        JSON.stringify({
          error: "Validation failed",
          details: validation.errors,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return handler(request, validation.data!);
  };
}

// Common validation schemas
export const CommonSchemas = {
  // Pagination
  pagination: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
    limit: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 10)),
    sort: z.string().optional(),
    order: z.enum(["asc", "desc"]).optional(),
  }),

  // Contact form
  contact: z.object({
    name: z.string().min(1, "Name is required").max(100, "Name too long"),
    email: z.string().email("Invalid email address"),
    subject: z
      .string()
      .min(1, "Subject is required")
      .max(200, "Subject too long"),
    message: z
      .string()
      .min(10, "Message too short")
      .max(2000, "Message too long"),
  }),

  // Newsletter subscription
  newsletter: z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().optional(),
    interests: z.array(z.string()).optional(),
  }),

  // Analytics
  analytics: z.object({
    event: z.string().min(1, "Event name is required"),
    category: z.string().optional(),
    label: z.string().optional(),
    value: z.number().optional(),
    properties: z.record(z.any()).optional(),
  }),

  // User preferences
  preferences: z.object({
    theme: z.enum(["light", "dark", "system"]).optional(),
    language: z.enum(["en", "es", "fr", "jp"]).optional(),
    notifications: z.boolean().optional(),
  }),

  // Search
  search: z.object({
    q: z.string().min(1, "Search query is required").max(100, "Query too long"),
    type: z.enum(["all", "documentation", "blog", "faq"]).optional(),
    page: z
      .string()
      .optional()
      .transform((val) => (val ? parseInt(val, 10) : 1)),
  }),

  // Error tracking
  errorTracking: z.object({
    message: z.string().min(1).max(1000, "Message too long"),
    stack: z.string().max(5000, "Stack trace too long").optional(),
    context: z.string().max(500, "Context too long").optional(),
    url: z.string().url("Invalid URL").max(500, "URL too long").optional(),
    userAgent: z.string().max(500, "User agent too long").optional(),
    timestamp: z.string().optional(),
  }),

  // Performance tracking
  performanceTracking: z.object({
    name: z.string().min(1).max(200, "Metric name too long"),
    duration: z.number().min(0).max(1000000, "Duration too large"),
    timestamp: z.string().optional(),
  }),

  // Resource tracking
  resourceTracking: z.object({
    name: z.string().min(1).max(500, "Resource name too long"),
    duration: z.number().min(0).max(1000000, "Duration too large"),
    size: z.number().min(0).max(1000000000, "Size too large").optional(),
    timestamp: z.string().optional(),
  }),
};

// Response helpers
export function createSuccessResponse(data: any, status = 200) {
  return new NextResponse(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export function createErrorResponse(
  message: string,
  status = 400,
  details?: any
) {
  return new NextResponse(
    JSON.stringify({
      success: false,
      error: message,
      ...(details && { details }),
    }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
