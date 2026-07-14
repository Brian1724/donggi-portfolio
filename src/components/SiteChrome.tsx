import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="site-main">{children}</main>
      <Footer />
    </>
  );
}
