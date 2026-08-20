import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FirstFiveMinutes from "../components/FirstFiveMinutes";
import Scenarios from "../components/Scenarios";
import EstimateCTA from "../components/EstimateCTA";
import BeforeAfter from "../components/BeforeAfter";
import RealRepairs from "../components/RealRepairs";
import RepairJourney from "../components/RepairJourney";
import Reviews from "../components/Reviews";
import About from "../components/About";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import QuizIntake from "../components/QuizIntake";
import Footer from "../components/Footer";
import { CATEGORIES } from "../components/faqData";

// LocalBusiness structured data so Google understands who Angel is, where he
// serves, and what he does. Reviews are intentionally NOT marked up here —
// they belong to the shop Angel works at, not the yourcrashangel brand,
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
};

// FAQPage rich-result markup mirroring the visible FAQ answers exactly.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: CATEGORIES.flatMap((c) => c.faqs).map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <FirstFiveMinutes />
        <Scenarios />
        <EstimateCTA />
        <BeforeAfter />
        <RealRepairs />
        <RepairJourney />
        <Reviews />
        <About />
        <QuizIntake />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
