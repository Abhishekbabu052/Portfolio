import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abhishek Babu — Software Developer",
  description:
    "Portfolio of Abhishek Babu — Software Developer building modern web applications and interactive digital experiences.",
  keywords: [
    "Abhishek Babu",
    "Software Developer",
    "Web Developer",
    "Full Stack Developer",
    "React",
    "Next.js",
    "Three.js",
    "JavaScript",
  ],
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