import {
  Navbar,
  Hero,
  Features,
  Pricing,
  Testimonials,
  FAQ,
  CTA,
  Footer,
} from "@/components/agen";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
