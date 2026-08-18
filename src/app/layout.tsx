import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Hub",
  description: "A community for small software projects.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
