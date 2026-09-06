import { Instagram, Gift } from 'lucide-react';
import { SITE } from '@/data/site';

export default function Offers() {
  return (
    <section id="offers" className="py-20 sm:py-28 bg-ink-900">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-volt-500/15 via-ink-800 to-ink-800 border border-volt-500/30 p-8 sm:p-12 text-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-volt-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-flame-500/10 rounded-full blur-3xl" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-volt-500/20 mb-6">
              <Gift className="h-7 w-7 text-volt-500" />
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
              FOLLOW. PLAY. <span className="text-volt-500">SAVE.</span>
            </h2>
            <p className="mt-4 text-lg sm:text-xl text-ink-200 max-w-2xl mx-auto">
              Follow our Instagram and get{' '}
              <span className="font-bold text-volt-500">50% OFF</span> your
              second attempt.
            </p>

            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flame-500 to-flame-600 px-7 py-3.5 text-base font-bold text-white hover:scale-105 transition-all active:scale-95 shadow-lg shadow-flame-500/20"
            >
              <Instagram className="h-5 w-5" />
              FOLLOW US ON INSTAGRAM
            </a>

            <p className="mt-5 text-xs text-ink-400">
              Offer subject to applicable park terms and verification.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
