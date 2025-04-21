import type { Metadata } from "next";
import "./globals.css";
import "7.css/dist/7.css";

export const metadata: Metadata = {
  title: "Portfólio - Brenno França",
  description: "Simulador de Windows 7 para demonstrar minhas skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          margin: 0,
          backgroundImage: "url('/images/wallpapers/desktop.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </body>
    </html>
  );
}
