import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PlanProvider } from "@/context/PlanContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });

export const metadata: Metadata = {
  title: "FitLog | Train With Intent",
  description: "Workout library and planning companion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">      <body className={`${inter.variable} ${oswald.variable} font-sans antialiased bg-[#111111] text-white flex flex-col min-h-screen`}>
        <PlanProvider>
          <Navbar />
          <main className="grow">{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#1c1c1e",
                color: "#fff",
                border: "1px solid #2a2a2a",
              },
              success: {
                iconTheme: { primary: "#ccff00", secondary: "#0a0a0a" },
              },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}