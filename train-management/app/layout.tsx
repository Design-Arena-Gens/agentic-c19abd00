import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TransitCore Rail Operations Suite",
  description: "Mobile-first train management interface for dispatch, fleet, and crew operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-slate-100 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(14,116,144,0.08),_transparent_55%)] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
          <TopBar />
          <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
