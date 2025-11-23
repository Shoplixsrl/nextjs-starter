import QRCode from "qrcode";
import { randomBytes } from "crypto";

export interface QRCodeOptions {
  foregroundColor?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  width?: number;
  margin?: number;
}

export async function generateQRCode(
  url: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const {
    foregroundColor = "#000000",
    backgroundColor = "#FFFFFF",
    errorCorrectionLevel = "M",
    width = 512,
    margin = 4,
  } = options;

  try {
    const qrCodeDataURL = await QRCode.toDataURL(url, {
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      errorCorrectionLevel,
      width,
      margin,
      type: "image/png",
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error("QR Code generation error:", error);
    throw new Error("Failed to generate QR code");
  }
}

export function generateShortCode(length: number = 8): string {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const bytes = randomBytes(length);
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }

  return result;
}

export function createMenuURL(shortCode: string, baseURL?: string): string {
  const base = baseURL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return `${base}/m/${shortCode}`;
}

export async function generateMenuQRCode(
  menuId: string,
  shortCode: string,
  options: QRCodeOptions = {}
): Promise<string> {
  const menuURL = createMenuURL(shortCode);
  return generateQRCode(menuURL, options);
}
