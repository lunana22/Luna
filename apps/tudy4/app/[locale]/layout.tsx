import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { loadMessages } from "@luna/i18n/next/load-messages";
import { notFound } from "next/navigation";
import { supportedLngs } from "@luna/i18n/config";
import "../globals.css";
import { QueryProviders } from "@luna/queries";
import { SupportedLocale } from "../../../../packages/i18n/src/messages-manifest";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "Tudy4",
  description: "Your Learning Companion",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!supportedLngs.includes(locale as SupportedLocale)) {
    notFound();
  }

  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <body className={`overflow-y-hidden antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <QueryProviders>{children}</QueryProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
