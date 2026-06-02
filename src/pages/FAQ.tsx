import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqCategories = ['General', 'Orders', 'Delivery', 'Payment'];

const faqData: Record<string, { q: string; a: string }[]> = {
  General: [
    { q: 'What is UrbanPlatter?', a: 'UrbanPlatter is a premium Nigerian food ordering platform that connects you with the best local kitchens and delivers authentic dishes straight to your door.' },
    { q: 'Which cities do you deliver to?', a: 'We currently deliver in Lagos, Abuja, Port Harcourt, Ibadan, Kano, and Enugu. We\'re expanding rapidly!' },
    { q: 'What are your operating hours?', a: 'Most of our partner kitchens operate from 8:00 AM to 10:00 PM, seven days a week. Some locations offer 24/7 service.' },
  ],
  Orders: [
    { q: 'How do I place an order?', a: 'Browse our menu, add items to your cart, proceed to checkout, enter your delivery details, and pay. It\'s that simple!' },
    { q: 'Can I modify or cancel my order?', a: 'You can modify or cancel your order within 5 minutes of placing it, or before the kitchen starts preparing it.' },
    { q: 'How do I reorder a previous meal?', a: 'Go to your order history in the dashboard and click \'Reorder\' on any past order.' },
  ],
  Delivery: [
    { q: 'How long does delivery take?', a: 'Standard delivery takes 45-60 minutes. Express delivery gets your food to you in 25-35 minutes.' },
    { q: 'What if my food arrives cold?', a: 'We guarantee hot delivery. If your food arrives cold, contact us immediately for a full refund or replacement.' },
    { q: 'Do you offer contactless delivery?', a: 'Yes! You can select \'Leave at door\' during checkout for contactless delivery.' },
  ],
  Payment: [
    { q: 'What payment methods do you accept?', a: 'We accept debit/credit cards (Visa, Mastercard, Verve), bank transfer, USSD, and cash on delivery.' },
    { q: 'Is my payment information secure?', a: 'Absolutely. All payments are processed through Paystack with 256-bit SSL encryption. We never store your card details.' },
    { q: 'Can I get a refund?', a: 'Yes, if your order is cancelled by the restaurant or significantly delayed, you\'ll receive a full refund within 3-5 business days.' },
  ],
};

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left"
      >
        <span className="font-body text-base font-medium text-brand-espresso pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-brand-espresso/40 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? '200px' : '0px' }}
      >
        <p className="px-6 pb-5 font-body text-[15px] text-brand-espresso/70 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('General');

  return (
    <div className="pt-[72px] min-h-screen bg-brand-cream">
      <div className="max-w-[800px] mx-auto px-6 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-semibold text-brand-espresso text-center mb-10">
          Frequently Asked Questions
        </h1>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto no-scrollbar">
          {faqCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-pill border font-body text-sm font-medium transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-brand-espresso text-brand-cream border-brand-espresso'
                  : 'border-gray-200 text-brand-espresso hover:bg-brand-espresso/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div>
          {faqData[activeCategory]?.map((faq, i) => (
            <AccordionItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </div>
  );
}
