import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptchaToken, isRecaptchaEnabled } from "@/lib/recaptcha";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No reCAPTCHA token provided" },
        { status: 400 }
      );
    }

    // In development, always return success
    if (!isRecaptchaEnabled()) {
      return NextResponse.json({
        success: true,
        message: "reCAPTCHA disabled in development",
        score: 1.0,
      });
    }

    // Verify the token
    const isValid = await verifyRecaptchaToken(token);

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "reCAPTCHA verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "reCAPTCHA verified successfully",
    });
  } catch (error) {
    console.error("reCAPTCHA verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
