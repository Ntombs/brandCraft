import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent } from "@/components/ui/card";

export default function OurStory() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-playfair text-4xl font-bold mb-6 text-center">Our Story</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          A journey of creative exploration, design innovation, and brand transformation
        </p>
        
        <div className="space-y-16">
          {/* Section 1: Our Beginning */}
          <section>
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="font-playfair text-2xl font-bold mb-4">Our Beginning</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2015, our studio began as a small team of passionate designers 
                  with a shared vision: to create authentic brand experiences that resonate 
                  with audiences and drive meaningful connections.
                </p>
                <p className="text-gray-600">
                  What started as a modest venture quickly evolved into a comprehensive 
                  creative agency, fueled by our commitment to excellence and our clients' trust.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-100 h-64 flex items-center justify-center rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
          </section>
          
          {/* Section 2: Our Philosophy */}
          <section>
            <div className="flex flex-col md:flex-row-reverse gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="font-playfair text-2xl font-bold mb-4">Our Philosophy</h2>
                <p className="text-gray-600 mb-4">
                  We believe that exceptional branding goes beyond aesthetics. It's about 
                  capturing the essence of your business, understanding your audience, and 
                  crafting a cohesive identity that tells your unique story.
                </p>
                <p className="text-gray-600">
                  Our approach combines strategic thinking with creative execution, ensuring 
                  that every visual element and message serves a purpose in building your 
                  brand's presence and connecting with your audience.
                </p>
              </div>
              <div className="md:w-1/2 bg-gray-100 h-64 flex items-center justify-center rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </section>
          
          {/* Section 3: Our Team */}
          <section>
            <h2 className="font-playfair text-2xl font-bold mb-6 text-center">Our Team</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              We're a diverse group of strategists, designers, and brand specialists united by our 
              passion for creating meaningful brand experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500 mb-3">Creative Director</p>
                  <p className="text-sm text-gray-600">
                    With over 15 years of experience in branding and design, Sarah leads our creative 
                    team with vision and expertise.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Michael Chen</h3>
                  <p className="text-sm text-gray-500 mb-3">Brand Strategist</p>
                  <p className="text-sm text-gray-600">
                    Michael transforms business objectives into powerful brand strategies that 
                    drive growth and meaningful connections.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1">Emma Rodriguez</h3>
                  <p className="text-sm text-gray-500 mb-3">Senior Designer</p>
                  <p className="text-sm text-gray-600">
                    Emma combines artistic talent with technical expertise to create visually 
                    stunning and strategically sound brand identities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Section 4: Our Process */}
          <section>
            <h2 className="font-playfair text-2xl font-bold mb-6 text-center">Our Process</h2>
            <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              We've refined our approach to brand development through years of experience, 
              creating a process that is both thorough and efficient.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Discovery</h3>
                  <p className="text-gray-600">
                    We begin by learning about your business, your goals, and your audience. 
                    This comprehensive understanding forms the foundation of our strategy.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Strategy</h3>
                  <p className="text-gray-600">
                    Based on our discoveries, we develop a tailored brand strategy that outlines positioning, 
                    messaging, and visual direction to achieve your objectives.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Creation</h3>
                  <p className="text-gray-600">
                    Our creative team brings the strategy to life through thoughtful design 
                    and content creation, crafting a unique and cohesive brand identity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-black text-white w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0">4</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Implementation</h3>
                  <p className="text-gray-600">
                    We provide you with all the tools and assets needed to successfully implement 
                    your brand across all touchpoints and platforms.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Section 5: Our Values */}
          <section className="bg-gray-100 p-8 rounded-lg">
            <h2 className="font-playfair text-2xl font-bold mb-6 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We embrace creativity and forward-thinking approaches to solve complex brand challenges.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Collaboration</h3>
                <p className="text-gray-600">
                  We work closely with our clients, valuing their input and involving them in the creative process.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg mb-2">Integrity</h3>
                <p className="text-gray-600">
                  We maintain the highest standards of professionalism and transparency in all our work.
                </p>
              </div>
            </div>
          </section>
          
          {/* Section 6: Get in Touch */}
          <section className="text-center">
            <h2 className="font-playfair text-2xl font-bold mb-4">Begin Your Brand Journey</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Ready to transform your brand? Register for an account to start working with our team 
              and discover the impact a strategic brand approach can have on your business.
            </p>
            <a href="/auth" className="inline-block px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors">
              Get Started
            </a>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
