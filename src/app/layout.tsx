import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Pembuat Soal Otomatis",
    description: "Buat soal, kunci jawaban, dan kisi-kisi dalam sekejap dengan Gemini AI",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="id">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
