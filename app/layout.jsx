import { Afacad_Flux } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import { Toaster } from "@/components/ui/sonner";
const afacad = Afacad_Flux({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
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
