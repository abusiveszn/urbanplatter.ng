import { Phone, Mail, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-[72px] min-h-screen bg-brand-cream">
      <div className="max-w-[1100px] mx-auto px-6 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-brand-espresso mb-3">
          Get in Touch
        </h1>
        <p className="font-body text-lg text-brand-espresso/60 mb-12 max-w-lg">
          Have a question, feedback, or partnership inquiry? We&apos;d love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={e => e.preventDefault()} className="bg-white p-8 shadow-card space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Full Name *</label>
                  <input type="text" placeholder="John Doe" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none focus:ring-[3px] focus:ring-brand-clay/10 transition-all" />
                </div>
                <div>
                  <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Email Address *</label>
                  <input type="email" placeholder="you@example.com" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none focus:ring-[3px] focus:ring-brand-clay/10 transition-all" />
                </div>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Phone Number</label>
                <input type="tel" placeholder="+234 801 234 5678" className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none focus:ring-[3px] focus:ring-brand-clay/10 transition-all" />
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Subject *</label>
                <select className="w-full h-[52px] px-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none focus:ring-[3px] focus:ring-brand-clay/10 transition-all">
                  <option>General Inquiry</option>
                  <option>Order Issue</option>
                  <option>Partnership</option>
                  <option>Feedback</option>
                  <option>Technical Support</option>
                </select>
              </div>
              <div>
                <label className="block font-body text-sm font-medium text-brand-espresso mb-2">Message *</label>
                <textarea rows={5} placeholder="Tell us how we can help..." className="w-full p-4 border border-gray-200 bg-white font-body text-base focus:border-brand-clay focus:outline-none focus:ring-[3px] focus:ring-brand-clay/10 transition-all resize-none" />
              </div>
              <button type="submit" className="w-full h-14 bg-brand-espresso text-brand-cream font-body font-semibold hover:bg-brand-clay transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <Phone size={24} className="text-brand-clay flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-sm font-medium text-brand-espresso mb-1">Call Us</p>
                <p className="font-body text-base text-brand-espresso">+234 800 123 4567</p>
                <p className="font-body text-sm text-brand-espresso/50 mt-1">Mon–Sat, 8am–10pm</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={24} className="text-brand-clay flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-sm font-medium text-brand-espresso mb-1">Email Us</p>
                <p className="font-body text-base text-brand-espresso">hello@urbanplatter.ng</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={24} className="text-brand-clay flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-body text-sm font-medium text-brand-espresso mb-1">Visit Us</p>
                <p className="font-body text-base text-brand-espresso">12 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</p>
              </div>
            </div>
            <div>
              <p className="font-body text-sm font-medium text-brand-espresso mb-3">Follow Us</p>
              <div className="flex items-center gap-5">
                <a href="#" className="text-brand-espresso/60 hover:text-brand-clay transition-colors"><Instagram size={22} /></a>
                <a href="#" className="text-brand-espresso/60 hover:text-brand-clay transition-colors"><Twitter size={22} /></a>
                <a href="#" className="text-brand-espresso/60 hover:text-brand-clay transition-colors"><Facebook size={22} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
