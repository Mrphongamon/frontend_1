import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.js"; // trigger rebuild
import Footer from "../components/Footer.js";
import { ThemeProvider } from "../components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "TimeSync — World Time Zone Comparison",
  description: "Easily compare time zones across countries and schedule meetings with people around the world.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
