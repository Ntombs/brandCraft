import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ImageIcon, Upload } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";
import { useState } from "react";

export default function LandingPage() {
  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);
  const [aboutImageUrl, setAboutImageUrl] = useState<string | null>(null);
  
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f5f0] text-[#2c2c2c]">
      {/* Header */}
      <header className="py-4 px-6 border-b border-[#e5e0d8]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Logo Space */}
            <div className="w-12 h-12 bg-white rounded-md border border-[#e5e0d8] flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-[#a98a55]" />
              <span className="sr-only">Upload Logo</span>
            </div>
            <h1 className="text-2xl font-playfair font-bold">Nompo Evelyn</h1>
          </div>
          <div className="flex space-x-4">
            <Link href="/auth">
              <Button className="btn-primary">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-playfair font-bold leading-tight mb-6">
              Strategic Brand Construction & Graphic Design
            </h1>
            <p className="text-gray-700 mb-8 text-lg">
              Nompo Evelyn specializes in comprehensive brand development, from visual identity design to strategic positioning and BBBEE compliance solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button className="btn-primary">
                  Start Your Brand Journey
                </Button>
              </Link>
            </div>
          </div>
          <ImageUpload
            title="Hero Image"
            subtitle="Add your image here (1200×900px recommended)"
            aspectRatio="4/3"
            className="overflow-hidden"
            initialOpacity={90}
            onImageUploaded={(url) => setHeroImageUrl(url)}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f8f5f0] p-6 rounded-md shadow-sm border border-[#e5e0d8] transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#a98a55] text-white flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Brand Strategy</h3>
              <p className="text-gray-600">
                Comprehensive brand development including positioning, identity, and strategic growth planning.
              </p>
            </div>
            <div className="bg-[#f8f5f0] p-6 rounded-md shadow-sm border border-[#e5e0d8] transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#a98a55] text-white flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Graphic Design</h3>
              <p className="text-gray-600">
                Professional visual identity creation including logos, marketing collateral, and digital assets.
              </p>
            </div>
            <div className="bg-[#f8f5f0] p-6 rounded-md shadow-sm border border-[#e5e0d8] transition-all hover:shadow-md">
              <div className="w-12 h-12 rounded-full bg-[#a98a55] text-white flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Compliance</h3>
              <p className="text-gray-600">
                Ensuring your brand meets industry regulations and standards, including BBBEE compliance, while maintaining its unique identity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center mb-12">Our Process</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#a98a55] text-white flex items-center justify-center mx-auto mb-4 text-xl font-medium">1</div>
              <h3 className="text-xl font-semibold mb-2">Discovery</h3>
              <p className="text-gray-600">
                We learn about your business, goals, and vision through our comprehensive onboarding process.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#a98a55] text-white flex items-center justify-center mx-auto mb-4 text-xl font-medium">2</div>
              <h3 className="text-xl font-semibold mb-2">Strategy</h3>
              <p className="text-gray-600">
                We develop a tailored brand strategy that aligns with your business objectives.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#a98a55] text-white flex items-center justify-center mx-auto mb-4 text-xl font-medium">3</div>
              <h3 className="text-xl font-semibold mb-2">Creation</h3>
              <p className="text-gray-600">
                Our team brings your brand to life through strategic design and messaging.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#a98a55] text-white flex items-center justify-center mx-auto mb-4 text-xl font-medium">4</div>
              <h3 className="text-xl font-semibold mb-2">Implementation</h3>
              <p className="text-gray-600">
                We deliver your brand assets and guide you through effective implementation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <ImageUpload
            title="About Image"
            subtitle="Add your team image here (1200×900px recommended)"
            aspectRatio="4/3"
            className="overflow-hidden"
            initialOpacity={75}
            onImageUploaded={(url) => setAboutImageUrl(url)}
          />
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">About Nompo Evelyn</h2>
            <p className="text-gray-700 mb-4">
              Nompo Evelyn was founded on the belief that exceptional branding should be accessible to businesses of all sizes. Our team of experienced designers and strategists are dedicated to creating authentic brand experiences that resonate with your audience.
            </p>
            <p className="text-gray-700 mb-6">
              We combine strategic thinking with creative execution to deliver brands that not only look beautiful but also drive business results. Our collaborative approach ensures that your unique vision is at the center of everything we create.
            </p>
            <Link href="/our-story">
              <Button variant="outline" className="btn-secondary">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-[#2c2c2c] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-6">Ready to Transform Your Brand?</h2>
          <p className="mb-8 text-lg">
            Join our clients who have successfully elevated their brands with our strategic approach and creative solutions.
          </p>
          <Link href="/auth">
            <Button className="bg-[#a98a55] hover:bg-[#8d7346] text-white px-8 py-3 rounded">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-[#e5e0d8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Nompo Evelyn</h3>
            <p className="text-gray-600">
              Strategic brand construction and design for forward-thinking businesses.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Brand Strategy</Link></li>
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Graphic Design</Link></li>
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Business Compliance</Link></li>
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Brand Identity</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-600">
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Brand Guide</Link></li>
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Our Process</Link></li>
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">Case Studies</Link></li>
              <li><Link href="/auth" className="hover:text-[#a98a55] transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="mailto:hello@nompoevelyn.com" className="hover:text-[#a98a55] transition-colors">hello@nompoevelyn.com</a></li>
              <li><a href="tel:+27111234567" className="hover:text-[#a98a55] transition-colors">+27 11 123 4567</a></li>
              <li>123 Design Street, Sandton, 2196, Johannesburg</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-[#e5e0d8] mt-10 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Nompo Evelyn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}