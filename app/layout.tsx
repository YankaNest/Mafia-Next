import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "MafiaST",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <div>
    </div>
        {children}
      </body>
    </html>
  );
}

