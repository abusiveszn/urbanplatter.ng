import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'Our Story' },
    { to: '/faq', label: 'FAQ' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? 'bg-brand-cream/95 backdrop-blur-md border-b border-brand-espresso/8 dark:bg-slate-950/95 dark:border-slate-700'
            : location.pathname === '/' 
              ? 'bg-transparent' 
              : 'bg-brand-cream/95 backdrop-blur-md dark:bg-slate-950/95'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[72px] gap-4">
            {/* Logo */}
            <Link to="/" className="font-display text-2xl font-semibold tracking-tight text-brand-espresso dark:text-slate-100">
              UrbanPlatter
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative font-body text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                    isActive(link.to)
                      ? 'text-brand-clay'
                      : 'text-brand-espresso hover:text-brand-clay dark:text-slate-100 dark:hover:text-brand-clay'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[2px] bg-brand-clay transition-all duration-300 ${
                      isActive(link.to) ? 'w-full' : 'w-0'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsOpen(true)}
                className="relative p-2 text-brand-espresso hover:text-brand-clay transition-colors dark:text-slate-100 dark:hover:text-brand-clay"
                aria-label="Open cart"
              >
                <ShoppingBag size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-clay text-white text-[11px] font-semibold rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <Link
                to="/login"
                className="hidden md:block font-body text-sm font-medium uppercase tracking-wider text-brand-espresso hover:text-brand-clay transition-colors dark:text-slate-100 dark:hover:text-brand-clay"
              >
                Sign In
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-brand-espresso dark:text-slate-100"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-brand-cream/98 backdrop-blur-lg dark:bg-slate-950/98 md:hidden pt-[72px]">
          <div className="flex flex-col items-center gap-6 pt-12 px-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="font-display text-2xl font-medium text-brand-espresso hover:text-brand-clay transition-colors dark:text-slate-100 dark:hover:text-brand-clay"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/login"
              className="font-display text-2xl font-medium text-brand-clay"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
