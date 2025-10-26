import { NextRequest, NextResponse } from "next/server";
import { verifyBotIdToken, isBotIdEnabled } from "@/lib/botid";

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, error: "No BotID token provided" },
        { status: 400 }
      );
    }

    // In development, always return success
    if (!isBotIdEnabled()) {
      return NextResponse.json({
        success: true,
        message: "BotID disabled in development",
        score: 1.0,
        riskLevel: 'low',
        isBot: false,
      });
    }

    // Verify the token
    const result = await verifyBotIdToken(token);

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: result.error || "BotID verification failed",
          riskLevel: result.riskLevel,
          isBot: result.isBot,
        },
        { status: 400 }
      );
    }

    // Check if the result indicates a bot
    if (result.isBot || result.riskLevel === 'high') {
      return NextResponse.json(
        { 
          success: false, 
          error: "Bot detected",
          riskLevel: result.riskLevel,
          isBot: result.isBot,
          score: result.score,
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "BotID verified successfully",
      score: result.score,
      riskLevel: result.riskLevel,
      isBot: result.isBot,
    });
  } catch (error) {
    console.error("BotID verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
