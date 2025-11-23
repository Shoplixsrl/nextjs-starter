import { NextRequest, NextResponse } from "next/server";
import { renderToBuffer } from "@react-pdf/renderer";
import { MenuPDF } from "@/lib/pdf/menu-generator";
import { createElement } from "react";

export async function POST(request: NextRequest) {
  try {
    const { menu, layout = "single" } = await request.json();

    if (!menu || !menu.menuName) {
      return NextResponse.json(
        { error: "Menu data is required" },
        { status: 400 }
      );
    }

    // Generate PDF
    const pdfBuffer = await renderToBuffer(
      createElement(MenuPDF, { menu, layout })
    );

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${menu.menuName.replace(/[^a-zA-Z0-9]/g, "_")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate PDF",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
