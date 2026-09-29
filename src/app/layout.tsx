import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resep Nusantara — Kumpulan Resep Masakan Indonesia",
  description:
    "Jelajahi puluhan resep autentik Indonesia: rendang, soto ayam, gudeg, pempek, dan banyak lagi. Lengkap dengan bahan, langkah, dan waktu memasak.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
