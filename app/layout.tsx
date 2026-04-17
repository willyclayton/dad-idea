import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FilterDrop — AC Filter Subscription",
  description:
    "Never forget your AC filter again. FilterDrop delivers the right filter on the right schedule, automatically. Register your unit and set it once.",
  openGraph: {
    title: "FilterDrop — AC Filter Subscription",
    description:
      "Auto-delivered AC filters sized to your unit. Register once, breathe easy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased">{children}</body>
    </html>
  );
}
