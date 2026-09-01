import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="site-skip-link" href="#main-content">
        본문으로 건너뛰기
      </a>
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
