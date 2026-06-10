import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FirstFiveMinutes from "../components/FirstFiveMinutes";
import BeforeAfter from "../components/BeforeAfter";
import ContentCards from "../components/ContentCards";
import Reviews from "../components/Reviews";
import About from "../components/About";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FirstFiveMinutes />
        <BeforeAfter />
        <ContentCards />
        <Reviews />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomBar />
      {/* Bottom padding on mobile so content isn't hidden behind the sticky bar */}
      <div className="h-14 md:hidden" aria-hidden="true" />
    </>
  );
}
