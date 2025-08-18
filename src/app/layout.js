import { Poppins } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/global/app-shell";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
