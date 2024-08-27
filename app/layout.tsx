import { ThemeProvider } from "../context/ThemeContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gemini Quizzify",
  description: "Created by: Wilfredo Aaron Sosa Ramos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
        <ThemeProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
