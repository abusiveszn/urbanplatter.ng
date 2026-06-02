import { HeartHandshake, Award, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: HeartHandshake,
      title: 'Authenticity',
      desc: 'Every recipe stays true to its traditional roots. No shortcuts, no compromises.',
    },
    {
      icon: Award,
      title: 'Quality',
      desc: 'We source the freshest ingredients and partner only with verified, top-rated kitchens.',
    },
    {
      icon: Users,
      title: 'Community',
      desc: 'We support local food vendors and create opportunities across the Nigerian food ecosystem.',
    },
  ];

  const stats = [
    { number: '50,000+', label: 'Happy Customers' },
    { number: '200+', label: 'Verified Kitchens' },
    { number: '6+', label: 'Cities Across Nigeria' },
    { number: '35', label: 'Min Avg Delivery' },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/images/about-hero.jpg" alt="Nigerian kitchen" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-brand-espresso/60" />
        <div className="relative z-10 text-center px-6 max-w-xl">
          <span className="font-body text-sm uppercase tracking-[2px] text-brand-gold mb-4 block">Our Story</span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-brand-cream leading-tight">
            Bringing Nigerian Flavors to Your Doorstep
          </h1>
        </div>
      </section>

      {/* Story Content */}
      <section className="bg-brand-cream py-24 px-6">
        <div className="max-w-[800px] mx-auto space-y-8">
          <p className="font-body text-lg text-brand-espresso leading-relaxed">
            UrbanPlatter was born from a simple belief: everyone deserves access to authentic, high-quality Nigerian cuisine without leaving home. Founded in 2024 in the heart of Lagos, we set out to bridge the gap between traditional kitchens and modern convenience.
          </p>
          <p className="font-body text-lg text-brand-espresso leading-relaxed">
            We partner with the finest local chefs and food vendors who have perfected their recipes over generations. Every dish on our platform is prepared with love, using fresh ingredients sourced from trusted local markets.
          </p>
          <p className="font-body text-lg text-brand-espresso leading-relaxed">
            Today, UrbanPlatter serves thousands of happy customers across Nigeria, delivering everything from smoky party jollof to piping hot pepper soup. We&apos;re not just delivering food — we&apos;re delivering culture, tradition, and a taste of home.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="font-display text-4xl font-semibold text-brand-espresso text-center mb-16">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {values.map(v => (
              <div key={v.title} className="text-center">
                <v.icon size={40} className="text-brand-clay mx-auto mb-5" />
                <h3 className="font-body text-xl font-semibold text-brand-espresso mb-3">{v.title}</h3>
                <p className="font-body text-base text-brand-espresso/70 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-espresso py-20 px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="font-display text-5xl font-semibold text-brand-gold">{s.number}</p>
              <p className="font-body text-base text-brand-cream/70 mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
