import type { Metadata } from "next";
import "./globals.css";
import { DemoProvider } from "@/state/demoStore";

export const metadata: Metadata = {
  title: "Pitch Deck: Cianjur Berlari Bupati Series Season 2 | KONI Kabupaten Cianjur",
  description:
    "Proposal konsep ekosistem platform digital terintegrasi untuk event lari KONI Kabupaten Cianjur: landing page, registrasi, dashboard peserta, dan operasional race pack.",
  icons: {
    icon: "/branding/logo-creadin.svg",
    shortcut: "/branding/logo-creadin.svg",
    apple: "/branding/logo-creadin.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="light">
      <body className="bg-slate-50 text-slate-900 antialiased selection:bg-emerald-500 selection:text-white">
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  );
}
