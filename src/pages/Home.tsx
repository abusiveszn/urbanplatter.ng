import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, ClipboardList, ChefHat, Truck, Heart, MapPin, ArrowRight } from 'lucide-react';
import { menuItems } from '../data/menuItems';
import { useCart } from '../hooks/useCart';

// ─── Hero Image Trail ───
const heroImages = Array.from(new Set(menuItems.map(m => m.image).filter(Boolean)));

function HeroImageTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const imgs: HTMLImageElement[] = [];
    let count = 0;
    heroImages.forEach(src => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        count++;
        if (count === heroImages.length) setLoaded(true);
      };
      img.src = src;
      imgs.push(img);
    });
    imagesRef.current = imgs;
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    interface Trail {
      x: number;
      y: number;
      imgIndex: number;
      opacity: number;
      scale: number;
      rotation: number;
      greyscale: number;
      framesAlive: number;
    }

    const trails: Trail[] = [];
    let spawnCooldown = 0;
    let animId: number;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = clientX - rect.left;
      mouseRef.current.y = clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const dx = mouseRef.current.x - mouseRef.current.prevX;
      const dy = mouseRef.current.y - mouseRef.current.prevY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 5 && spawnCooldown <= 0 && trails.length < 6) {
        trails.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          imgIndex: Math.floor(Math.random() * imagesRef.current.length),
          opacity: 1,
          scale: 0.6 + Math.random() * 0.3,
          rotation: (Math.random() - 0.5) * 0.2,
          greyscale: 1,
          framesAlive: 0,
        });
        spawnCooldown = 8;
      }
      spawnCooldown = Math.max(0, spawnCooldown - 1);

      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.framesAlive++;

        if (t.framesAlive < 20) {
          t.greyscale = Math.max(0, t.greyscale - 0.05);
        } else {
          t.opacity -= 0.015;
          t.x -= 1.5;
        }

        if (t.opacity <= 0) {
          trails.splice(i, 1);
          continue;
        }

        const img = imagesRef.current[t.imgIndex];
        if (!img) continue;

        const iw = 220 * t.scale;
        const ih = (img.height / img.width) * iw;

        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.rotation);
        ctx.globalAlpha = t.opacity;

        if (t.greyscale > 0.01) {
          // Draw greyscale
          ctx.filter = `grayscale(${t.greyscale * 100}%)`;
        }

        ctx.drawImage(img, -iw / 2, -ih / 2, iw, ih);
        ctx.filter = 'none';
        ctx.restore();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [loaded]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s' }}
    />
  );
}

// ─── Isometric Menu Grid ───
function IsometricMenuGrid() {
  const categories = [
    { id: 'rice', label: 'Rice Dishes', from: '#c06625', to: '#f1bf45', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
    { id: 'swallows', label: 'Soups & Swallows', from: '#1e1d1c', to: '#3a3836', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
    { id: 'grills', label: 'Grills & BBQ', from: '#f1bf45', to: '#c06625', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z' },
    { id: 'drinks', label: 'Drinks', from: '#c06625', to: '#1e1d1c', icon: 'M7 2v11h3v9l7-12h-4l4-8z' },
    { id: 'snacks', label: 'Snacks', from: '#f1bf45', to: '#d4a23a', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
    { id: 'desserts', label: 'Desserts', from: '#1e1d1c', to: '#c06625', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z' },
  ];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="relative w-full max-w-[600px] mx-auto" style={{ height: '400px', perspective: '800px' }}>
      <div
        className="grid grid-cols-3 gap-5 absolute inset-0 transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: hoveredIdx !== null ? 'rotateX(0deg) rotateY(0deg)' : 'rotateX(55deg) rotateZ(-45deg)',
        }}
      >
        {categories.map((cat, i) => (
        <Link
            key={cat.label}
            to={`/menu?category=${cat.id}`}
            className="flex flex-col items-center justify-center gap-3 transition-all duration-300"
            style={{
              transform: hoveredIdx === i ? 'translateZ(60px) scale(1.05)' : hoveredIdx !== null ? 'translateZ(10px)' : 'translateZ(40px)',
              background: `linear-gradient(135deg, ${cat.from}, ${cat.to})`,
              borderRadius: '12px',
              padding: '24px',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
              <path d={cat.icon} />
            </svg>
            <span className="font-body text-xs font-medium text-white text-center leading-tight">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Word Cloud Story ───
function WordCloudStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrolled = -rect.top;
      const maxScroll = sectionHeight - vh;
      const p = Math.max(0, Math.min(1, scrolled / maxScroll));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const words = [
    { text: 'NIGERIAN CUISINE', x: 0.2, y: 0.3, size: 28, speed: 0.8, color: '#c06625' },
    { text: 'SPICY', x: 0.7, y: 0.2, size: 36, speed: 1.2, color: '#f1bf45' },
    { text: 'FRESH', x: 0.5, y: 0.6, size: 24, speed: 0.6, color: '#1e1d1c' },
    { text: 'COMMUNITY', x: 0.8, y: 0.5, size: 20, speed: 1.0, color: '#c06625' },
    { text: 'FLAVOR', x: 0.1, y: 0.7, size: 32, speed: 1.4, color: '#1e1d1c' },
    { text: 'TRADITION', x: 0.6, y: 0.8, size: 22, speed: 0.9, color: '#f1bf45' },
    { text: 'HOME', x: 0.3, y: 0.4, size: 26, speed: 0.7, color: '#c06625' },
    { text: 'QUALITY', x: 0.9, y: 0.3, size: 18, speed: 1.1, color: '#1e1d1c' },
    { text: 'PASSION', x: 0.4, y: 0.9, size: 30, speed: 1.3, color: '#f1bf45' },
    { text: '\u{1F336}', x: 0.15, y: 0.5, size: 40, speed: 1.0, color: '#c06625' },
    { text: '\u{1F35A}', x: 0.85, y: 0.7, size: 40, speed: 0.8, color: '#1e1d1c' },
    { text: '\u{1F1F3}\u{1F1EC}', x: 0.5, y: 0.25, size: 36, speed: 1.2, color: '#27ae60' },
    { text: '\u{1F372}', x: 0.25, y: 0.8, size: 40, speed: 0.9, color: '#c06625' },
  ];

  return (
    <div ref={sectionRef} className="relative bg-brand-cream" style={{ height: '250vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {words.map((w, i) => {
          const z = (w.speed * progress * 1000) - 500;
          const opacity = z > -200 && z < 300 ? Math.max(0.2, 1 - Math.abs(z) / 500) : 0;
          const scale = Math.max(0.3, 1 - Math.abs(z) / 800);
          return (
            <div
              key={i}
              className="absolute font-display font-semibold pointer-events-none select-none whitespace-nowrap transition-none"
              style={{
                left: `${w.x * 100}%`,
                top: `${w.y * 100}%`,
                fontSize: `${w.size}px`,
                color: w.color,
                opacity,
                transform: `translate(-50%, -50%) translateZ(${z}px) scale(${scale})`,
                zIndex: Math.floor(z),
              }}
            >
              {w.text}
            </div>
          );
        })}

        {/* Center Title Overlay */}
        <h2
          className="relative z-10 font-display text-4xl md:text-5xl font-semibold text-brand-espresso text-center px-6 transition-all duration-300"
          style={{
            opacity: progress > 0.1 && progress < 0.8 ? 1 : 0,
            transform: progress > 0.1 && progress < 0.8 ? 'translateY(0)' : 'translateY(30px)',
          }}
        >
          More Than Just a Meal
        </h2>
      </div>
    </div>
  );
}

// ─── Main Home Page ───
export default function Home() {
  const { addItem, setIsOpen } = useCart();
  const featuredItems = menuItems.filter(m => [1, 11, 4, 14].includes(m.id));

  const handleAddToCart = useCallback((item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setIsOpen(true);
  }, [addItem, setIsOpen]);

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] bg-brand-espresso overflow-hidden flex items-center justify-center">
        <HeroImageTrail />
        <div className="relative z-10 text-center px-6 max-w-2xl">
          <h1
            className="font-display text-5xl sm:text-6xl md:text-7xl font-semibold text-brand-cream leading-tight tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.3s', opacity: 0 }}
          >
            Taste the Culture
          </h1>
          <p
            className="mt-6 font-body text-lg text-brand-cream/70 max-w-md mx-auto leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            Premium dishes crafted with authentic tradition, delivered straight to your door.
          </p>
          <Link
            to="/menu"
            className="inline-block mt-8 px-10 py-4 bg-brand-clay text-brand-cream font-body text-base font-semibold rounded-pill hover:bg-brand-gold hover:text-brand-espresso transition-colors duration-300 animate-fade-in"
            style={{ animationDelay: '0.7s', opacity: 0 }}
          >
            Order Now
          </Link>
        </div>
      </section>

      {/* ── FEATURED MENU GRID ── */}
      <section className="bg-brand-espresso py-20 md:py-28 px-6">
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-cream text-center mb-14">
          Explore Our Menu
        </h2>
        <IsometricMenuGrid />
        <div className="text-center mt-12">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 font-body text-base text-brand-cream hover:text-brand-gold transition-colors duration-200"
          >
            View Full Menu <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── WORD CLOUD STORY ── */}
      <WordCloudStory />

      {/* ── FEATURED DISHES ── */}
      <section className="bg-brand-cream py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-espresso text-center mb-14">
            Popular Dishes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map(item => (
              <div
                key={item.id}
                className="bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative overflow-hidden" style={{ paddingBottom: '75%' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="absolute bottom-0 left-0 right-0 h-[52px] bg-brand-clay/95 text-brand-cream font-body text-sm font-semibold flex items-center justify-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  >
                    + Quick Add
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-medium text-brand-espresso">
                    {item.name}
                  </h3>
                  <p className="font-body text-sm text-brand-espresso/60 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-body text-lg font-semibold text-brand-clay">
                      &#8358;{item.price.toLocaleString()}
                    </span>
                    <span className="font-body text-xs text-brand-espresso/50 flex items-center gap-1">
                      <MapPin size={12} /> {item.time} mins
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-20 md:py-28 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-espresso text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { icon: ClipboardList, label: 'Order', desc: 'Browse and select your favorite dishes' },
              { icon: ChefHat, label: 'Cook', desc: 'Our chefs prepare your meal fresh' },
              { icon: Truck, label: 'Dispatch', desc: 'Quick delivery to your location' },
              { icon: Heart, label: 'Enjoy', desc: 'Savor authentic Nigerian flavors' },
            ].map((step, i) => (
              <div key={step.label} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <step.icon size={36} className="text-brand-clay" />
                </div>
                <div className="w-8 h-8 mx-auto mb-3 rounded-full bg-brand-clay text-white font-body text-sm font-semibold flex items-center justify-center">
                  {i + 1}
                </div>
                <h3 className="font-body text-lg font-semibold text-brand-espresso">{step.label}</h3>
                <p className="font-body text-sm text-brand-espresso/60 mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERY & REVIEWS ── */}
      <section className="bg-brand-cream py-20 md:py-28 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Delivery */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-espresso leading-tight">
              Fast & Reliable Delivery
            </h2>
            <p className="font-body text-lg text-brand-espresso/70 mt-5 leading-relaxed max-w-md">
              From our kitchen to your doorstep in under 45 minutes. Our delivery partners handle your food with care, ensuring every meal arrives fresh, hot, and exactly as ordered.
            </p>
            <div className="grid grid-cols-4 gap-4 mt-10">
              {[
                { icon: ClipboardList, label: 'Order' },
                { icon: ChefHat, label: 'Cook' },
                { icon: Truck, label: 'Dispatch' },
                { icon: Heart, label: 'Enjoy' },
              ].map(step => (
                <div key={step.label} className="text-center">
                  <step.icon size={32} className="text-brand-clay mx-auto mb-2" />
                  <span className="font-body text-xs font-medium uppercase tracking-wider text-brand-espresso">
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-espresso mb-10">
              What Our Customers Say
            </h2>
            <div className="space-y-6">
              {[
                {
                  quote: "The jollof rice here is absolutely incredible. Tastes just like my grandmother's recipe. Ordered three times this week already!",
                  author: 'Amara O.',
                  date: '2 days ago',
                },
                {
                  quote: "Fast delivery, hot food, perfect packaging. The suya platter was smoky and perfectly spiced. UrbanPlatter is now my go-to.",
                  author: 'Chioma N.',
                  date: '1 week ago',
                },
                {
                  quote: "Finally, a food delivery app that understands Nigerian cuisine. The pounded yam and egusi combo was heavenly.",
                  author: 'Tunde K.',
                  date: '2 weeks ago',
                },
              ].map((review, i) => (
                <div key={i} className="bg-white p-8 shadow-card border-b-[3px] border-brand-clay">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={18} className="fill-brand-gold text-brand-gold" />
                    ))}
                  </div>
                  <p className="font-body text-base text-brand-espresso leading-relaxed italic">
                    "{review.quote}"
                  </p>
                  <div className="mt-4">
                    <span className="font-body text-sm font-semibold text-brand-clay">
                      {review.author}
                    </span>
                    <span className="font-body text-xs text-brand-espresso/40 ml-2">
                      {review.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
