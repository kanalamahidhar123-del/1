import { Calendar, Scale } from 'lucide-react';
import { SITE } from '@/data/site';

interface PriceCard {
  label: string;
  duration: string;
  price: number;
  highlight?: boolean;
}

const cards: PriceCard[] = [
  { label: 'Adults', duration: '1 Hour', price: 500 },
  { label: 'Adults', duration: '2 Hours', price: 850, highlight: true },
  { label: 'Children', duration: '1 Hour', price: 350 },
  { label: 'Children', duration: '2 Hours', price: 600, highlight: true },
];

export default function Pricing() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-ink-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-bold text-volt-500 tracking-widest uppercase mb-3">
            Pricing
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            CHOOSE YOUR <span className="text-volt-500">FUN</span>
          </h2>
          <p className="mt-4 text-lg text-ink-400">
            Simple, transparent pricing for everyone.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`relative rounded-2xl border p-6 flex flex-col transition-all hover:scale-105 ${
                card.highlight
                  ? 'bg-gradient-to-b from-volt-500/10 to-ink-900 border-volt-500/40'
                  : 'bg-ink-900 border-ink-800 hover:border-ink-600'
              }`}
            >
              {card.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-volt-500 px-3 py-1 text-xs font-bold text-ink-950">
                  BEST VALUE
                </span>
              )}
              <p className="text-sm font-semibold text-ink-300 uppercase tracking-wide">
                {card.label}
              </p>
              <p className="mt-1 text-xs text-ink-400">{card.duration}</p>
              <div className="mt-4 mb-6">
                <span className="font-display font-black text-4xl text-white">
                  ₹{card.price}
                </span>
              </div>
              <button
                onClick={() => scrollTo('#booking')}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-volt-500 px-5 py-2.5 text-sm font-bold text-ink-950 hover:bg-volt-400 transition-all active:scale-95"
              >
                <Calendar className="h-4 w-4" />
                BOOK NOW
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-ink-400">
          <Scale className="h-5 w-5 text-volt-500" />
          <p className="text-sm font-medium">
            Participants must be below {SITE.weightLimit}.
          </p>
        </div>
      </div>
    </section>
  );
}
