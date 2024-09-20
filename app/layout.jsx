import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "Traversy Property Pulse",
  keywords: "rental, property, real estate",
  description: "https://www.udemy.com/course/nextjs-from-scratch",
}

const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
 
export default RootLayout;