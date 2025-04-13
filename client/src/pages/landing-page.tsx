import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-playfair font-bold">Nompo Evelyn</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-mono font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Strategic Brand Construction &<br />Graphic Design for the South African Market
            </h1>
            <p className="text-gray-700 mb-8 text-lg">
                Nompo Evelyn specializes in comprehensive brand development for the South African market, from visual identity design to strategic positioning and BBBEE compliance solutions.
              </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button className="bg-black text-white hover:bg-gray-900 px-8 py-6">
                  Start Your Brand Journey
                </Button>
              </Link>
            </div>
          </div>
          <div className="border-8 border-black h-96 grid place-items-center">
            <h2 className="font-playfair text-3xl font-bold italic">Your Vision, Our Expertise</h2>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 p-6 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Brand Strategy</h3>
              <p className="text-gray-600">
                Comprehensive brand development including positioning, identity, and strategic growth planning for the South African market.
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Graphic Design</h3>
              <p className="text-gray-600">
                Professional visual identity creation including logos, marketing collateral, and digital assets.  Tailored to the South African aesthetic.
              </p>
            </div>
            <div className="border border-gray-200 p-6 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-semibold mb-2">Business Compliance (including BBBEE)</h3>
              <p className="text-gray-600">
                Ensuring your brand meets South African industry regulations and standards, including BBBEE compliance, while maintaining its unique identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-gray-600">
                We learn about your South African business, goals, and vision through our comprehensive onboarding process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-2">Strategy</h3>
              <p className="text-gray-600">
                We develop a tailored brand strategy that aligns with your business objectives within the South African context.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-2">Creation</h3>
              <p className="text-gray-600">
                Our team brings your brand to life through strategic design and messaging, keeping in mind the South African market.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
              <h3 className="text-xl font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600">
                We deliver your brand assets and guide you through effective implementation in the South African market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="border-8 border-black h-96 grid place-items-center">
            <h2 className="font-playfair text-3xl font-bold italic">Our Story</h2>
          </div>
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">About Nompo Evelyn</h2>
            <p className="text-gray-700 mb-4">
              Nompo Evelyn was founded on the belief that exceptional branding should be accessible to South African businesses of all sizes. Our team of experienced designers and strategists are dedicated to creating authentic brand experiences that resonate with your South African audience.
            </p>
            <p className="text-gray-700 mb-6">
              We combine strategic thinking with creative execution to deliver brands that not only look beautiful but also drive business results within the South African market. Our collaborative approach ensures that your unique vision is at the center of everything we create.
            </p>
            <Link href="/auth">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-6">Ready to Transform Your South African Brand?</h2>
          <p className="mb-8 text-lg">
            Join our clients who have successfully elevated their brands with our strategic approach and creative solutions in the South African market.
          </p>
          <Link href="/auth">
            <Button className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-lg">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Nompo Evelyn</h3>
            <p className="text-gray-600">
              Strategic brand construction and design for forward-thinking South African businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Brand Strategy</li>
              <li>Graphic Design</li>
              <li>Business Compliance (including BBBEE)</li>
              <li>Brand Identity</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Brand Guide</li>
              <li>Our Process</li>
              <li>Case Studies</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li>hello@nompoevelyn.com</li>
              <li>+27 (XXX) XXX-XXXX</li> {/* Placeholder South African number */}
              <li>123 Design Street, Johannesburg</li> {/* Example South African address */}
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-gray-200 mt-10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Nompo Evelyn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}