import { useState, useMemo, useEffect } from 'react';
import { Search, ChevronDown, Clock, Star } from 'lucide-react';
import { menuItems, categories } from '../data/menuItems';
import { useSearchParams } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import {
  LayoutGrid, Soup, CircleDot, CookingPot, Flame, Wine, Cookie, CakeSlice,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutGrid, Soup, CircleDot, CookingPot, Flame, Wine, Cookie, CakeSlice,
};

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const { addItem, setIsOpen } = useCart();

  const filteredItems = useMemo(() => {
    let items = [...menuItems];

    if (activeCategory !== 'all') {
      items = items.filter(item => item.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        item =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        items.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return items;
  }, [activeCategory, sortBy, searchQuery]);

  useEffect(() => {
    const c = searchParams.get('category') || 'all';
    setActiveCategory(c);
  }, [searchParams]);

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setIsOpen(true);
  };

  const sortOptions = [
    { value: 'popular', label: 'Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Best Rated' },
    { value: 'newest', label: 'Newest' },
  ];

  return (
    <div className="pt-[72px] min-h-screen bg-brand-cream">
      {/* Filter & Search Bar */}
      <div className="sticky top-[72px] z-[90] bg-brand-cream border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 h-20 flex items-center gap-4">
          {/* Category Filters */}
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => {
              const Icon = iconMap[cat.icon] || LayoutGrid;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                        onClick={() => {
                          setActiveCategory(cat.id);
                          if (cat.id === 'all') setSearchParams({});
                          else setSearchParams({ category: cat.id });
                        }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-pill border whitespace-nowrap font-body text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-espresso text-brand-cream border-brand-espresso'
                      : 'bg-transparent text-brand-espresso border-gray-200 hover:bg-brand-espresso/5'
                  }`}
                >
                  <Icon size={16} />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-espresso/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="h-10 w-52 pl-10 pr-4 border border-gray-200 bg-white font-body text-sm focus:border-brand-clay focus:outline-none focus:ring-2 focus:ring-brand-clay/10 transition-all"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 h-10 px-4 border border-gray-200 bg-white font-body text-sm text-brand-espresso hover:bg-brand-cream transition-colors"
              >
                Sort By
                <ChevronDown size={16} className={`transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 shadow-lg z-50 min-w-[180px]">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 font-body text-sm hover:bg-brand-cream transition-colors ${
                        sortBy === opt.value ? 'text-brand-clay font-medium' : 'text-brand-espresso'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="sm:hidden px-4 py-3">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-espresso/40" />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="h-11 w-full pl-10 pr-4 border border-gray-200 bg-white font-body text-sm focus:border-brand-clay focus:outline-none"
          />
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-10">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-body text-lg text-brand-espresso/50">
              No items found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
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
                <div className="p-6">
                  <h3 className="font-display text-2xl font-medium text-brand-espresso leading-tight">
                    {item.name}
                  </h3>
                  <p className="font-body text-sm text-brand-espresso/60 mt-2 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="font-body text-xl font-semibold text-brand-clay">
                      &#8358;{item.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-3 text-brand-espresso/50">
                      <span className="flex items-center gap-1 font-body text-xs">
                        <Clock size={13} /> {item.time}m
                      </span>
                      <span className="flex items-center gap-1 font-body text-xs">
                        <Star size={13} className="fill-brand-gold text-brand-gold" /> {item.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
