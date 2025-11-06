import Image from "next/image";
import {
  Zap,
  TrendingUp,
  Network,
  Cloud,
  Monitor,
  MessageSquare,
  Sparkles,
  Smartphone,
  Globe,
  Target,
  type LucideIcon
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <Image
                src="/images/logo/LetUsDoIT-logo-light.jpeg"
                alt="LetUsDoIT ApS Logo"
                width={180}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-primary-navy hover:text-primary-blue transition-colors font-medium">
                About
              </a>
              <a href="#services" className="text-primary-navy hover:text-primary-blue transition-colors font-medium">
                Services
              </a>
              <a href="#contact" className="text-primary-navy hover:text-primary-blue transition-colors font-medium">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-navy via-primary-navy to-primary-blue">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Transform Your Business with
              <span className="block text-primary-green mt-2">Smart IT Solutions</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              We help companies digitalize, automate, and optimize their business processes—without unnecessary complexity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-4 bg-primary-orange text-white font-semibold rounded-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="px-8 py-4 bg-white text-primary-navy font-semibold rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
              Experienced IT Professional
            </h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              LetUsDoIT ApS brings years of IT expertise and experience from one of the world's largest IT companies, delivering proven solutions with a personal touch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-3 text-center">Practical Solutions</h3>
              <p className="text-gray-600 text-center">
                We deliver IT solutions that work in the real world—reducing manual work and improving efficiency.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-3 text-center">Deep Expertise</h3>
              <p className="text-gray-600 text-center">
                Years of experience from one of the world's leading IT companies brings proven best practices to your projects.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-primary-navy mb-3 text-center">No Complexity</h3>
              <p className="text-gray-600 text-center">
                We focus on clarity and simplicity—delivering solutions that are easy to understand and use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-navy mb-4">
              Our Competencies
            </h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We offer a comprehensive range of IT services to help your business thrive in the digital age.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Process Automation",
                description: "Streamline workflows and remove manual steps to boost productivity",
                icon: Zap,
                color: "text-primary-blue"
              },
              {
                title: "Business Process Analysis & Lean Optimization",
                description: "Make operations more efficient through systematic analysis",
                icon: TrendingUp,
                color: "text-primary-green"
              },
              {
                title: "Business Process Modeling",
                description: "Mapping and modeling process flows for clarity and optimization",
                icon: Network,
                color: "text-primary-orange"
              },
              {
                title: "Microsoft 365 Configuration",
                description: "Expert setup and configuration of Microsoft 365 environments",
                icon: Cloud,
                color: "text-primary-blue"
              },
              {
                title: "Digital Solutions",
                description: "Implementation, customization, and maintenance of digital platforms",
                icon: Monitor,
                color: "text-primary-navy"
              },
              {
                title: "Chatbot Implementation",
                description: "Automated communication and self-service solutions",
                icon: MessageSquare,
                color: "text-primary-green"
              },
              {
                title: "AI Integration",
                description: "Integrate artificial intelligence into apps and digital solutions",
                icon: Sparkles,
                color: "text-primary-orange"
              },
              {
                title: "App Development",
                description: "Building apps from scratch, including MVP and PoC projects",
                icon: Smartphone,
                color: "text-primary-blue"
              },
              {
                title: "Website Maintenance",
                description: "Configuration and maintenance in Drupal or Strapi",
                icon: Globe,
                color: "text-primary-green"
              },
              {
                title: "Agile Project Management",
                description: "SCRUM certified—structured execution and delivery",
                icon: Target,
                color: "text-primary-orange"
              },
            ].map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow border border-gray-100"
                >
                  <div className="mb-4">
                    <IconComponent className={`w-10 h-10 ${service.color}`} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-navy mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-navy to-primary-blue">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let Us Do IT - Together
            </h2>
            <div className="w-24 h-1 bg-primary-orange mx-auto mb-6"></div>
            <p className="text-lg text-gray-200">
              Ready to transform your business? Get in touch with us today.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold text-primary-navy mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-blue mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-primary-navy">Email</p>
                      <a href="mailto:simon@letusdoit.dk" className="text-primary-blue hover:underline">
                        simon@letusdoit.dk
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-green mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-primary-navy">Phone</p>
                      <a href="tel:+4541208088" className="text-primary-blue hover:underline">
                        +45 41 20 80 88
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-primary-orange mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <div>
                      <p className="font-semibold text-primary-navy">Company</p>
                      <p className="text-gray-600">LetUsDoIT ApS</p>
                      <p className="text-gray-600 text-sm">CVR: 45625818</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-navy-dark rounded-xl p-6 flex items-center justify-center">
                <div className="text-center">
                  <Image
                    src="/images/logo/LetUsDoIT-logo-dark.jpeg"
                    alt="LetUsDoIT ApS Logo"
                    width={200}
                    height={100}
                    className="mx-auto mb-4"
                  />
                  <p className="text-white font-semibold text-lg">
                    Let Us Do IT!
                  </p>
                  <p className="text-gray-200 mt-2">
                    Your partner in digital transformation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-navy text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} LetUsDoIT ApS. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            CVR: 45625818
          </p>
        </div>
      </footer>
    </main>
  );
}
