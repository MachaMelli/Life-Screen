import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/fonts.css";
import { LegalProvider } from "@/components/legal/LegalModals";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Life Screen",
  description: "Time is the only currency we truly own. Witness the brevity and beauty of your journey on a single canvas.",
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased font-sans`}
      >
        <ThemeProvider>
          <LegalProvider>
            {children}
          </LegalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
