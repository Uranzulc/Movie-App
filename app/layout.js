import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {" "}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
