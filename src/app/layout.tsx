import type { Metadata } from "next";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/locale-context";
import { ThemeProvider } from "@/lib/theme-context";
import { HtmlAttributesSync } from "@/components/layout/html-attributes-sync";
import { ToastProvider } from "@/components/ui/toast-context";

export const metadata: Metadata = {
  title: "FreelancePilot",
  description:
    "AI copilot that helps freelancers discover, translate, and respond to international projects. Portfolio demo — all data is simulated.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-ink">
        <ThemeProvider>
          <LocaleProvider>
            <HtmlAttributesSync />
            <ToastProvider>{children}</ToastProvider>
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
