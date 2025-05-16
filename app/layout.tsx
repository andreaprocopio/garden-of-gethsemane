import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Garden of Gethsemane",
  description:
    "a web app designed to harmonize isochronic tones, frequency-based soundscapes, and guided breathing exercises into a unified experience that promotes mental clarity, relaxation, and altered states of consciousness.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#009689",
          colorText: "#f1f5f9",
          colorBackground: "#050c1f",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${roboto.variable} antialiased flex flex-col h-full min-h-screen`}
        >
          <ThemeProvider attribute="class" defaultTheme="system">
            {children}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
