import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LetUsDoIT ApS - Digitalization, Automation & Process Optimization",
  description: "LetUsDoIT ApS helps companies digitalize, automate, and optimize their business processes. Experienced IT professionals delivering practical solutions.",
  keywords: "digitalization, automation, process optimization, IT solutions, Denmark, business process, AI integration, chatbots, app development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
