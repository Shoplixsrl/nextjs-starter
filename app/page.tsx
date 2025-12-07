import {
  Header,
  Hero,
  Features,
  HowItWorks,
  Gallery,
  Testimonials,
  Pricing,
  CTA,
  Footer
} from "@/components/fitpulse";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
