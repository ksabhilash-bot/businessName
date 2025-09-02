import localFont from "next/font/local";
import "./globals.css";
import Topbar from "@/components/Topbar";
import { Toaster } from "@/components/ui/sonner";

// Import the font from the fonts folder (relative to this file)
const afacad = localFont({
  src: "../fonts/AfacadFluxvariable.ttf", // adjust path from app/layout.jsx
  display: "swap",
  variable: "--font-afacad",
});

export const metadata = {
  title: "NameForge",
  description: "Generate unique business name",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${afacad.className} antialiased`}>
        <Topbar />
        <div className="mt-35 bg-zinc-950 h-screen w-full">{children}</div>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
