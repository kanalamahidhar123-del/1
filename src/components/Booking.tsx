import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2, Scale } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { SITE } from '@/data/site';

interface FormState {
  full_name: string;
  mobile_number: string;
  email: string;
  visit_date: string;
  preferred_time: string;
  number_of_people: string;
  category: 'Adult' | 'Children' | '';
  duration: '1 Hour' | '2 Hours' | '';
  special_request: string;
  agreed_to_terms: boolean;
}

const initial: FormState = {
  full_name: '',
  mobile_number: '',
  email: '',
  visit_date: '',
  preferred_time: '',
  number_of_people: '',
  category: '',
  duration: '',
  special_request: '',
  agreed_to_terms: false,
};

export default function Booking() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.full_name.trim()) e.full_name = 'Full name is required';
    if (!form.mobile_number.trim()) e.mobile_number = 'Mobile number is required';
    else if (!/^\d{10}$/.test(form.mobile_number.replace(/\D/g, '')))
      e.mobile_number = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Enter a valid email address';
    if (!form.visit_date) e.visit_date = 'Visit date is required';
    if (!form.preferred_time) e.preferred_time = 'Preferred time is required';
    if (!form.number_of_people) e.number_of_people = 'Number of people is required';
    else if (Number(form.number_of_people) < 1)
      e.number_of_people = 'At least 1 person required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.duration) e.duration = 'Please select a duration';
    if (!form.agreed_to_terms)
      e.agreed_to_terms = 'You must agree to the safety rules and terms';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const { error } = await supabase.from('bookings').insert({
        full_name: form.full_name.trim(),
        mobile_number: form.mobile_number.trim(),
        email: form.email.trim() || null,
        visit_date: form.visit_date,
        preferred_time: form.preferred_time,
        number_of_people: Number(form.number_of_people),
        category: form.category,
        duration: form.duration,
        special_request: form.special_request.trim() || null,
        agreed_to_terms: form.agreed_to_terms,
      });
      if (error) throw error;
      setStatus('success');
      setForm(initial);
    } catch {
      setStatus('error');
    }
  };

  const update = (field: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const inputClass =
    'w-full rounded-xl bg-ink-900 border border-ink-700 px-4 py-3 text-white placeholder-ink-500 focus:border-volt-500 focus:outline-none focus:ring-1 focus:ring-volt-500 transition-colors';
  const labelClass = 'block text-sm font-semibold text-ink-200 mb-1.5';
  const errClass = 'mt-1 text-xs text-flame-400 flex items-center gap-1';

  if (status === 'success') {
    return (
      <section id="booking" className="py-20 sm:py-28 bg-ink-950">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-ink-900 border border-volt-500/30 p-8 sm:p-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-volt-500 mx-auto mb-4" />
            <h3 className="font-display font-black text-2xl text-white mb-3">
              Thank You!
            </h3>
            <p className="text-ink-300 leading-relaxed">
              Your booking request has been received. Our team will contact you
              to confirm your slot.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-volt-500 px-6 py-3 text-sm font-bold text-ink-950 hover:bg-volt-400 transition-colors"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 sm:py-28 bg-ink-950">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="inline-block text-sm font-bold text-volt-500 tracking-widest uppercase mb-3">
            Booking
          </span>
          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white">
            BOOK YOUR <span className="text-volt-500">SLOT</span>
          </h2>
          <p className="mt-4 text-ink-400">
            Fill in your details and we will get back to you to confirm your
            visit.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-ink-900 border border-ink-800 p-6 sm:p-8 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                Full Name <span className="text-flame-400">*</span>
              </label>
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => update('full_name', e.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
              {errors.full_name && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.full_name}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Mobile Number <span className="text-flame-400">*</span>
              </label>
              <input
                type="tel"
                value={form.mobile_number}
                onChange={(e) => update('mobile_number', e.target.value)}
                className={inputClass}
                placeholder="10-digit mobile number"
              />
              {errors.mobile_number && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.mobile_number}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass}
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className={errClass}>
                <AlertCircle className="h-3 w-3" /> {errors.email}
              </p>
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                Visit Date <span className="text-flame-400">*</span>
              </label>
              <input
                type="date"
                value={form.visit_date}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => update('visit_date', e.target.value)}
                className={inputClass}
              />
              {errors.visit_date && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.visit_date}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Preferred Time <span className="text-flame-400">*</span>
              </label>
              <input
                type="time"
                value={form.preferred_time}
                onChange={(e) => update('preferred_time', e.target.value)}
                className={inputClass}
              />
              {errors.preferred_time && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.preferred_time}
                </p>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            <div>
              <label className={labelClass}>
                Number of People <span className="text-flame-400">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={form.number_of_people}
                onChange={(e) => update('number_of_people', e.target.value)}
                className={inputClass}
                placeholder="1"
              />
              {errors.number_of_people && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.number_of_people}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Category <span className="text-flame-400">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="Adult">Adult</option>
                <option value="Children">Children</option>
              </select>
              {errors.category && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.category}
                </p>
              )}
            </div>
            <div>
              <label className={labelClass}>
                Duration <span className="text-flame-400">*</span>
              </label>
              <select
                value={form.duration}
                onChange={(e) => update('duration', e.target.value)}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="1 Hour">1 Hour</option>
                <option value="2 Hours">2 Hours</option>
              </select>
              {errors.duration && (
                <p className={errClass}>
                  <AlertCircle className="h-3 w-3" /> {errors.duration}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className={labelClass}>Special Request / Message</label>
            <textarea
              value={form.special_request}
              onChange={(e) => update('special_request', e.target.value)}
              rows={3}
              className={inputClass}
              placeholder="Any special requests or messages for our team"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.agreed_to_terms}
              onChange={(e) => update('agreed_to_terms', e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-ink-600 bg-ink-900 text-volt-500 focus:ring-volt-500"
            />
            <span className="text-sm text-ink-300">
              I agree to follow the park's safety rules and terms.
            </span>
          </label>
          {errors.agreed_to_terms && (
            <p className={errClass}>
              <AlertCircle className="h-3 w-3" /> {errors.agreed_to_terms}
            </p>
          )}

          <div className="flex items-center gap-2 text-ink-400 text-sm">
            <Scale className="h-4 w-4 text-volt-500" />
            <span>Participants must be below {SITE.weightLimit}.</span>
          </div>

          {status === 'error' && (
            <div className="rounded-xl bg-flame-500/10 border border-flame-500/30 p-4 flex items-center gap-2 text-flame-400 text-sm">
              <AlertCircle className="h-4 w-4" />
              Something went wrong. Please try again or call us at {SITE.phone}.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-volt-500 px-6 py-3.5 text-base font-bold text-ink-950 hover:bg-volt-400 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                SUBMITTING...
              </>
            ) : (
              'CONTINUE'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
