import { NextRequest, NextResponse } from "next/server";
import { generateMenuQRCode, generateShortCode } from "@/lib/qr/generator";

export async function POST(request: NextRequest) {
  try {
    const {
      menuId,
      shortCode: providedShortCode,
      foregroundColor,
      backgroundColor,
      width,
    } = await request.json();

    if (!menuId) {
      return NextResponse.json(
        { error: "Menu ID is required" },
        { status: 400 }
      );
    }

    const shortCode = providedShortCode || generateShortCode(8);

    const qrCodeImage = await generateMenuQRCode(menuId, shortCode, {
      foregroundColor,
      backgroundColor,
      width,
    });

    return NextResponse.json({
      success: true,
      qrCode: {
        image: qrCodeImage,
        shortCode,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/m/${shortCode}`,
      },
    });
  } catch (error) {
    console.error("QR generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate QR code",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
