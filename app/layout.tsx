import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";

import { Room } from "./Room";
import { Toaster } from "@/components/ui/sonner"

const workSans = Work_Sans({ 
  subsets: ["latin"],
  variable: '--font-work-sans',
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "ProtoForge",
  description: "Online live prototyping tool using Fabric.js and Liveblocks",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-[#1F2633]`}>
        <Room>
          {children}
        </Room>
        <Toaster 
          position="bottom-center"  
          richColors
        />
      </body>
    </html>
  );
}
