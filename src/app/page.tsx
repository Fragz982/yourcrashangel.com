import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FirstFiveMinutes from "../components/FirstFiveMinutes";
import Scenarios from "../components/Scenarios";
import BeforeAfter from "../components/BeforeAfter";
import RepairJourney from "../components/RepairJourney";
import ContentCards from "../components/ContentCards";
import Reviews from "../components/Reviews";
import About from "../components/About";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";

// LocalBusiness structured data so Google understands who Angel is, where he
// serves, and what he does. Reviews are intentionally NOT marked up here —
// they belong to United Collision Specialists, not the yourcrashangel brand,
// and fabricating aggregateRating on the brand risks a review-spam penalty.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "yourcrashangel",
  alternateName: "The Accident Translator",
  description:
    "A real collision estimator in Los Angeles who explains what's actually going on with your car and your insurance claim — free, honest, no sales pressure.",
  url: "https://yourcrashangel.com",
  telephone: "+1-213-279-2992",
  image: "https://yourcrashangel.com/opengraph-image",
  priceRange: "Free consultation",
  areaServed: {
    "@type": "City",
    name: "Los Angeles",
  },
  knowsAbout: [
    "Car accident guidance",
    "Auto collision repair estimates",
    "Insurance claim navigation",
    "OEM vs aftermarket parts",
    "Total loss vehicle valuation",
  ],
  sameAs: [
    "https://tiktok.com/@yourcrashangel",
    "https://instagram.com/yourcrashangel",
    "https://youtube.com/@yourcrashangel",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <FirstFiveMinutes />
        <Scenarios />
        <BeforeAfter />
        <RepairJourney />
        <ContentCards />
        <Reviews />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomBar />
      {/* Spacer so the sticky bar (plus iOS home-indicator inset) never covers content */}
      <div
        className="md:hidden"
        style={{ height: "calc(3.5rem + env(safe-area-inset-bottom))" }}
        aria-hidden="true"
      />
    </>
  );
}
