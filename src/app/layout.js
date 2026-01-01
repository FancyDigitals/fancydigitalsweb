import "./globals.css";
import "@/styles/new-year-popup.css";

import MobileContactFloat from "@/components/MobileContactFloat";
import NewYearPopup from "@/components/NewYearPopup";
import GalleryLightbox from "@/components/GalleryLightbox";


export const metadata = {
  title: "Fancy Digitals — Premium Digital Agency",
  description:
    "FANCY DIGITALS helps brands grow with Graphics Design, Web Development, Email Marketing, SEO, and Digital Marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050705] text-white antialiased">
        {/* Global New Year Popup */}
        <NewYearPopup />

        {children}

        {/* Mobile Contact Floating Button */}
        <MobileContactFloat />
        <GalleryLightbox />
      </body>
    </html>
  );
}
