import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  const linkColumns = [
    {
      title: 'Menu',
      links: [
        { label: 'Rice Dishes', to: '/menu?cat=rice' },
        { label: 'Soups & Swallows', to: '/menu?cat=swallows' },
        { label: 'Grills', to: '/menu?cat=grills' },
        { label: 'Drinks', to: '/menu?cat=drinks' },
        { label: 'Snacks', to: '/menu?cat=snacks' },
        { label: 'Desserts', to: '/menu?cat=desserts' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Blog', to: '#' },
        { label: 'Careers', to: '#' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', to: '/faq' },
        { label: 'Contact Us', to: '/contact' },
        { label: 'FAQs', to: '/faq' },
        { label: 'Delivery Info', to: '/faq' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms of Service', to: '#' },
        { label: 'Privacy Policy', to: '#' },
        { label: 'Cookie Policy', to: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-brand-espresso text-brand-cream">
      {/* Big CTA */}
      <div className="py-16 md:py-24 text-center px-6">
        <Link
          to="/menu"
          className="font-display text-5xl sm:text-7xl md:text-[120px] font-semibold tracking-tight text-brand-cream hover:text-brand-clay transition-colors duration-300 leading-none"
        >
          ORDER NOW
        </Link>
      </div>

      {/* Divider */}
      <div className="border-t border-brand-cream/10" />

      {/* Links Grid */}
      <div className="max-w-[900px] mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {linkColumns.map(col => (
            <div key={col.title}>
              <h4 className="font-body text-sm font-semibold uppercase tracking-wider text-brand-cream mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="font-body text-[15px] text-brand-cream/60 hover:text-brand-cream transition-colors duration-200 leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Social + Copyright */}
      <div className="border-t border-brand-cream/10">
        <div className="max-w-[900px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <a href="#" className="text-brand-cream/60 hover:text-brand-gold hover:scale-110 transition-all duration-200">
              <Instagram size={22} />
            </a>
            <a href="#" className="text-brand-cream/60 hover:text-brand-gold hover:scale-110 transition-all duration-200">
              <Twitter size={22} />
            </a>
            <a href="#" className="text-brand-cream/60 hover:text-brand-gold hover:scale-110 transition-all duration-200">
              <Facebook size={22} />
            </a>
          </div>
          <p className="font-body text-[13px] text-brand-cream/40 text-center">
            &copy; 2025 UrbanPlatter.ng. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
