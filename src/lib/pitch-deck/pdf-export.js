"use client";

/**
 * Export pitch deck to PDF using html2canvas-pro + jsPDF
 * Handles Tailwind v4 modern CSS colors + off-screen rendering issues
 */
export async function exportDeckToPDF(container, filename = "pitch-deck.pdf") {
  const html2canvas = (await import("html2canvas-pro")).default;
  const { jsPDF } = await import("jspdf");

  const slides = container.querySelectorAll("[data-slide-page]");
  if (slides.length === 0) throw new Error("No slides found to export");

  // A4 landscape in mm
  const PDF_WIDTH_MM = 297;
  const PDF_HEIGHT_MM = 210;

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];

    // Force the slide into the DOM properly and ensure fonts/styles have loaded
    await document.fonts?.ready;
    await new Promise((r) => requestAnimationFrame(r));

    const canvas = await html2canvas(slide, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      width: 1400,
      height: 990,
      windowWidth: 1400,
      windowHeight: 990,
      // Critical: this ensures the offscreen element renders with proper styling
      foreignObjectRendering: false,
      removeContainer: true,
      // Wait for images inside the slide
      imageTimeout: 15000,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    if (i > 0) pdf.addPage("a4", "landscape");

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      PDF_WIDTH_MM,
      PDF_HEIGHT_MM,
      undefined,
      "FAST"
    );
  }

  pdf.save(filename);
}