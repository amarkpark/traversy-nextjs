import "@/assets/styles/globals.css";

export const metadata = {
  title: "Traversy Property Pulse",
  keywords: "rental, property, real estate",
  description: "https://www.udemy.com/course/nextjs-from-scratch",
}

const RootLayout = ({ children }) => {
  return ( <html>
    <body>
      <main>{children}</main>
    </body>
  </html> );
}
 
export default RootLayout;