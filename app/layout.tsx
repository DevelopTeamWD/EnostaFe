import type { Metadata } from "next";
import { Header } from '@/components/header';
import { Inter } from "next/font/google";
import "./globals.css";
import { fetchGraphQL, dataGlobal, getImageUrl } from "@/lib/api";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
export const dynamic = 'force-dynamic';

export async function generateMetadata() {
  try {
    const data = await fetchGraphQL(dataGlobal);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const seo = data?.global?.seo;
    return {
      title: seo?.metaTitle || "Enosta | AI-Native Digital Product Consultancy",
      description: seo?.metaDescription || "Enosta - ISO 27001-certified AI-native software development company in Vietnam",
      openGraph: {
        title: seo?.metaTitle || "Enosta | AI-Native Digital Product Consultancy",
        description: seo?.metaDescription || "Enosta - ISO 27001-certified AI-native software development company in Vietnam",
        url: '/',
        images: [
          {
            url: `${siteUrl}/favicon.svg`,
            width: 1200,
            height: 630,
          },
        ],
        siteName: 'Enosta',
        type: 'website',
      },
    };
  } catch (error) {
    console.error("error metadata:", error);
    return { title: "My Enosta", description: "Default description" };
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let getGlobal = null;

  try {
    getGlobal = await fetchGraphQL(dataGlobal);
  } catch (error) {
    console.log("error detail:", error);
  }
  const header = getGlobal?.global?.header || {};
  const footer = getGlobal?.global?.footer || {};

  const logoLink = header?.logo?.link || "/";
  const logoUrl = header?.logo?.image?.url ? getImageUrl(header.logo.image.url) : "/Enosta_logo.svg";

  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`} suppressHydrationWarning={true}

    >
      <body className="min-h-full flex flex-col font-sans">
        <Header
          header={header}
          logoLink={logoLink}
          logoUrl={logoUrl}
        />

        <div className="site">
          {children}
        </div>

        <footer>
          <div className="container">
            <div className="footer-grid">
              <div className="footer-brand">
                <div className="logo">
                  <a href={footer?.logo?.link || "/"}>
                    <img src={getImageUrl(footer?.logo?.image?.url)!} alt="Logo" style={{ objectFit: 'contain' }} />
                  </a>
                </div>
                <p>{footer?.description}</p>
              </div>
              {footer?.menufooter?.map((menu: any, index: number) => (
                <div className="footer-col" key={`footer-menu-${index}`}>
                  <h4>{menu.title}</h4>
                  {menu?.text?.map((item: any, idx: number) => {
                    if (item.link) {
                      return (
                        <a href={item.link} key={`footer-menu-${index}-${idx}`}>
                          {item.name}
                        </a>
                      );
                    } else {
                      return (
                        <span key={`footer-menu-${index}-${idx}`}>
                          {item.name}
                        </span>
                      );
                    }
                  })}
                </div>
              ))}

            </div>
            <div className="footer-bottom">{footer.text_bottom}</div>
          </div>
        </footer>

      </body>
    </html>
  );
}
