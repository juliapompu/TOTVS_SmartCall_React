import { Footer } from '../../components/global/Footer';
import { Header } from '../../components/global/Header';
import { HeroUpload } from '../../components/HeroUpload/HeroUpload';
import { NewsSection } from '../../components/NewsSection/NewsSection';
import { PartnershipsCarousel } from '../../components/PartnershipsCarousel/PartnershipsCarousel';
import { Ranking } from '../../components/Ranking/Ranking';

export const Home = () => (
  <div className="page-shell">
    <Header />
    <main>
      <HeroUpload />
      <NewsSection />
      <PartnershipsCarousel />
      <Ranking />
    </main>
    <Footer />
  </div>
);