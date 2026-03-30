import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const host = headersList.get("host") || "";

  // Detecta qual domínio está sendo usado
  const baseUrl = host.includes("cultivai.blwdevs.com.br")
    ? "https://cultivai.blwdevs.com.br"
    : "https://cultivaai.blwdevs.com.br";

  return {
    metadataBase: new URL(baseUrl),
    title: "Cultiva.ai — Da nota fiscal ao manejo: tudo no mesmo lugar",
    description:
      "Gerencie safras, colaboradores, estoque e atividades de manejo com seu assistente de IA que responde por áudio. Baseado na EMBRAPA.",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/logoVerde.svg", type: "image/svg+xml" },
      ],
      apple: "/logoVerde.svg",
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: baseUrl,
      title: "Cultiva.ai — Da nota fiscal ao manejo: tudo no mesmo lugar",
      description:
        "Gerencie safras, colaboradores, estoque e atividades de manejo com seu assistente de IA que responde por áudio. Baseado na EMBRAPA.",
      siteName: "Cultiva.ai",
      images: [
        {
          url: "/logoVerde.png",
          width: 1200,
          height: 630,
          alt: "Cultiva.ai - Gestão Agrícola Inteligente",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Cultiva.ai — Da nota fiscal ao manejo: tudo no mesmo lugar",
      description:
        "Gerencie safras, colaboradores, estoque e atividades de manejo com seu assistente de IA que responde por áudio. Baseado na EMBRAPA.",
      images: ["/logoVerde.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
