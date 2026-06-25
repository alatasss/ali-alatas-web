import type { Metadata } from "next";
import "./globals.css";
import NoCopyGuard from "@/components/NoCopyGuard";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Ali Alatas - in Pursuit of Polymathy",
  description:
    "A polymath exploring the intersections of faith, science, art, and technology. Building things that matter, one curiosity at a time.",
  metadataBase: new URL("https://alialatas.vercel.app"),
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Ali Alatas - in Pursuit of Polymathy",
    description:
      "A polymath exploring the intersections of faith, science, art, and technology.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFFBF3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#FFFBF3] text-[#1a1a1a] font-sf antialiased">
        <NoCopyGuard />
        <main>{children}</main>
        <SpeedInsights />
      </body>
    </html>
  );
}
