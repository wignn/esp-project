import Navbar from "@/components/nav";
import "./globals.css";
import ClientWrapper from "@/components/clientWarp";

export const metadata = {
  title: "Sistem Banjir",
  description: "Sistem Banjir",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`antialiased dark:bg-gray-900`}>
        <ClientWrapper>
          {" "}
          <Navbar />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
