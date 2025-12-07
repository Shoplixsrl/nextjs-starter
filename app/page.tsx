import Image from "next/image";
import Link from "next/link";

// Logo Component
function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="w-[50px] h-[40px] relative">
        <svg viewBox="0 0 50 40" fill="currentColor" className="w-full h-full">
          <path d="M25 0L50 40H0L25 0Z" />
        </svg>
      </div>
      <span className="text-sm font-medium tracking-[0.1em] uppercase">Bellevoire</span>
    </div>
  );
}

// Hamburger Menu Button
function HamburgerButton() {
  return (
    <button className="flex flex-col gap-[6px] p-2" aria-label="Menu">
      <div className="hamburger-line" />
      <div className="hamburger-line" />
    </button>
  );
}

// Link Button Component
function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="link-button">
      {children}
    </Link>
  );
}

// Hotel Card Component
function HotelCard({
  name,
  description,
  image,
  altImage,
}: {
  name: string;
  description: string;
  image: string;
  altImage: string;
}) {
  return (
    <div className="bg-[rgb(237,233,228)] w-full">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        {/* Details */}
        <div className="flex flex-col gap-6 lg:w-1/3 py-8 lg:py-16">
          <h4 className="text-lg font-medium tracking-wide">{name}</h4>
          <p className="body-text text-[rgb(122,111,106)] leading-relaxed">
            {description}
          </p>
          <LinkButton href="#">Learn more</LinkButton>
        </div>

        {/* Images */}
        <div className="flex flex-col lg:flex-row gap-4 lg:w-2/3">
          <div className="relative w-full lg:w-1/2 aspect-[4/5] overflow-hidden">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full lg:w-1/2 aspect-[4/5] overflow-hidden">
            <Image
              src={altImage}
              alt={`${name} interior`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Fixed Header with mix-blend-mode */}
      <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
        <nav className="flex items-center justify-between px-8 lg:px-12 py-6">
          <Link href="/" className="text-[rgb(237,233,228)]">
            <Logo />
          </Link>
          <HamburgerButton />
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/bellevoire/hero-bg.jpg"
            alt="Bellevoire"
            fill
            priority
            className="object-cover scale-[1.2]"
          />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {/* Subtitle */}
          <p className="hero-subtitle text-[rgb(237,233,228)] mb-8">
            Where Dreams Meet the Beauty of France
          </p>

          {/* Main Title */}
          <h1 className="hero-title text-[rgb(237,233,228)]">
            Bellevoire
          </h1>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-24 lg:py-40 px-8 lg:px-12 overflow-hidden">
        {/* Decorative Circle */}
        <div className="absolute top-20 left-1/4 w-[300px] h-[300px] border border-[rgb(189,180,175)] rounded-full opacity-30" />

        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            {/* Text Content */}
            <div className="lg:w-1/2 flex flex-col gap-8">
              {/* Heading */}
              <div className="flex flex-col gap-2">
                <h2 className="section-heading text-[rgb(23,15,11)]">
                  Welcome to Bellevoire
                </h2>
                <h2 className="section-heading-italic text-[rgb(23,15,11)]">
                  Your Elegant Retreat
                </h2>
                <h2 className="section-heading text-[rgb(23,15,11)] text-right">
                  in the Heart of Paris
                </h2>
              </div>

              {/* Description */}
              <p className="body-text max-w-[500px] text-center lg:text-left mx-auto lg:mx-0">
                We provide an experience of refined comfort, timeless elegance, and heartfelt hospitality. Nestled in the romantic city of Paris, France, our collection of three distinguished hotels invites travelers from around the world to immerse themselves in the charm and culture of the City of Light.
              </p>

              {/* CTA */}
              <div className="flex justify-center lg:justify-start">
                <LinkButton href="#about">More About us</LinkButton>
              </div>
            </div>

            {/* Image */}
            <div className="lg:w-1/2 relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bellevoire/about.jpg"
                alt="Bellevoire Interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Section */}
      <section className="py-24 lg:py-40 px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="section-heading text-[rgb(23,15,11)]">
              Paris Awaits at
            </h2>
            <h2 className="section-heading-italic text-[rgb(23,15,11)]">
              Your Bellevoire Retreat
            </h2>
          </div>

          {/* Hotel Cards */}
          <div className="flex flex-col gap-20">
            <HotelCard
              name="Bellevoire Montmartre"
              description="Nestled in the artistic heart of Paris, this boutique hotel blends bohemian charm with serene garden courtyards and panoramic city views."
              image="/bellevoire/hotel-1.jpg"
              altImage="/bellevoire/hotel-1-alt.jpg"
            />

            <HotelCard
              name="Bellevoire Le Marais"
              description="Located in one of Paris's most historic neighborhoods, this elegant retreat offers a perfect blend of medieval architecture and contemporary luxury."
              image="/bellevoire/hotel-2.jpg"
              altImage="/bellevoire/hotel-2-alt.jpg"
            />

            <HotelCard
              name="Bellevoire Champs-Élysées"
              description="Experience the grandeur of Parisian life on the world's most famous avenue, where sophistication meets timeless French elegance."
              image="/bellevoire/hotel-3.jpg"
              altImage="/bellevoire/hotel-3-alt.jpg"
            />
          </div>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="py-24 lg:py-40 px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sticky Sidebar */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start">
              <div className="flex flex-col gap-6">
                <p className="text-sm tracking-[0.1em] uppercase text-[rgb(122,111,106)]">
                  Accommodations
                </p>
                <h2 className="section-heading text-[rgb(23,15,11)]">
                  Rooms &
                </h2>
                <h2 className="section-heading-italic text-[rgb(23,15,11)]">
                  Suites
                </h2>
                <p className="body-text text-[rgb(122,111,106)]">
                  Discover our collection of thoughtfully designed rooms and suites, each offering a unique blend of Parisian elegance and modern comfort.
                </p>
                <LinkButton href="#">Explore Rooms</LinkButton>
              </div>
            </div>

            {/* Images */}
            <div className="lg:w-2/3 flex flex-col gap-8">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/bellevoire/rooms-1.jpg"
                  alt="Luxury Room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/bellevoire/rooms-2.png"
                  alt="Suite Interior"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-24 lg:py-40 px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-16">
            {/* Sticky Sidebar */}
            <div className="lg:w-1/3 lg:sticky lg:top-32 lg:self-start">
              <div className="flex flex-col gap-6">
                <p className="text-sm tracking-[0.1em] uppercase text-[rgb(122,111,106)]">
                  Experiences
                </p>
                <h2 className="section-heading text-[rgb(23,15,11)]">
                  Dining &
                </h2>
                <h2 className="section-heading-italic text-[rgb(23,15,11)]">
                  Wellness
                </h2>
                <p className="body-text text-[rgb(122,111,106)]">
                  Indulge in exquisite culinary experiences and rejuvenating wellness treatments that embody the art of French living.
                </p>
                <LinkButton href="#">Discover More</LinkButton>
              </div>
            </div>

            {/* Images */}
            <div className="lg:w-2/3 flex flex-col gap-8">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/bellevoire/dining.jpg"
                  alt="Fine Dining"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/bellevoire/spa.jpg"
                  alt="Spa & Wellness"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 lg:py-40 px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="section-heading text-[rgb(23,15,11)]">
              Moments of
            </h2>
            <h2 className="section-heading-italic text-[rgb(23,15,11)]">
              Elegance
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bellevoire/gallery-1.jpg"
                alt="Gallery 1"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bellevoire/gallery-2.jpg"
                alt="Gallery 2"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bellevoire/gallery-3.jpg"
                alt="Gallery 3"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden md:col-span-2">
              <Image
                src="/bellevoire/gallery-featured.webp"
                alt="Featured Gallery"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/bellevoire/gallery-4.jpg"
                alt="Gallery 4"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/bellevoire/cta-bg.png"
            alt="Book Your Stay"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-8">
          <h2 className="section-heading text-[rgb(237,233,228)] mb-4">
            Begin Your
          </h2>
          <h2 className="section-heading-italic text-[rgb(237,233,228)] mb-12">
            Parisian Journey
          </h2>
          <Link
            href="#"
            className="inline-block bg-[rgb(237,233,228)] text-[rgb(23,15,11)] px-8 py-4 text-sm font-medium tracking-[0.1em] uppercase hover:bg-white transition-colors"
          >
            Book Your Stay
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[rgb(23,15,11)] text-[rgb(237,233,228)] py-20 px-8 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Logo & Description */}
            <div className="lg:col-span-2">
              <Logo className="mb-6" />
              <p className="text-[rgb(189,180,175)] max-w-md leading-relaxed">
                Experience the art of Parisian hospitality at Bellevoire. Three distinguished hotels, one unforgettable journey through the City of Light.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">Explore</h4>
              <ul className="space-y-3">
                <li><Link href="#" className="text-[rgb(189,180,175)] hover:text-[rgb(237,233,228)] transition-colors">Our Hotels</Link></li>
                <li><Link href="#" className="text-[rgb(189,180,175)] hover:text-[rgb(237,233,228)] transition-colors">Rooms & Suites</Link></li>
                <li><Link href="#" className="text-[rgb(189,180,175)] hover:text-[rgb(237,233,228)] transition-colors">Dining</Link></li>
                <li><Link href="#" className="text-[rgb(189,180,175)] hover:text-[rgb(237,233,228)] transition-colors">Spa & Wellness</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-medium tracking-[0.1em] uppercase mb-6">Contact</h4>
              <ul className="space-y-3 text-[rgb(189,180,175)]">
                <li>Paris, France</li>
                <li>+33 1 23 45 67 89</li>
                <li>hello@bellevoire.com</li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[rgb(122,111,106)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[rgb(122,111,106)]">
              © 2024 Bellevoire. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-[rgb(122,111,106)] hover:text-[rgb(237,233,228)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-[rgb(122,111,106)] hover:text-[rgb(237,233,228)] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
