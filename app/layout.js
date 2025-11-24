import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "nRoot Technologies Pvt. Ltd.",
  description: "Discover Innovation with nRoot Technologies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
