import { useEffect, useState } from 'react';
import { Star, Check, ShieldCheck, MapPin, ChevronDown, ChevronUp, Lock, Truck, Clock, AlertTriangle } from 'lucide-react';
import Footer from '../components/Footer';
import {
    AFFILIATE_LINK, HERO_CONTENT, PROBLEM_SECTION, SOLUTION_SECTION,
    INGREDIENTS, SCIENCE_SECTION, REVIEWS, PROS_CONS, FAQS, REFERENCES, POLICY_TEXT
} from '../data/reviewData';

export default function Review() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

    // Split reviews: Top 3 for Featured, Rest for Wall
    const featuredReviews = [REVIEWS[0], REVIEWS[4], REVIEWS[1]]; // Amazon, Nurse, Skeptic
    const otherReviews = [REVIEWS[2], REVIEWS[3], REVIEWS[5], REVIEWS[6]];

    return (
        <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* HEADER */}
            <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-center">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-8 h-8 text-emerald-600" />
                        <span className="font-bold text-xl tracking-tight text-slate-900">Kerassentials<span className="text-emerald-600">Review</span></span>
                    </div>
                    <a
                        href={AFFILIATE_LINK}
                        className="hidden md:block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full transition-all shadow-lg hover:shadow-xl"
                    >
                        ORDER NOW
                    </a>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="relative bg-white border-b border-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-green-50/50 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold uppercase tracking-wider">
                                <Star className="w-3 h-3 fill-current" /> 2026 Updated Review
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                                {HERO_CONTENT.title}
                            </h1>
                            <ul className="space-y-3">
                                {HERO_CONTENT.checklist.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-lg text-slate-700">
                                        <Check className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="pt-4">
                                <a
                                    href={AFFILIATE_LINK}
                                    className="inline-block w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white text-xl font-bold py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-center animate-pulse"
                                >
                                    {HERO_CONTENT.ctaText} &rsaquo;
                                </a>
                                <p className="mt-3 text-xs text-slate-400 text-center sm:text-left">
                                    Official Website • 60-Day Guarantee • Secure Checkout
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            {/* Visual Placeholder for Product */}
                            <div className="relative aspect-square max-w-md mx-auto bg-slate-100 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200">
                                <img
                                    src="https://placehold.co/600x600/f1f5f9/10b981?text=Kerassentials+Official+Bottle"
                                    alt="Kerassentials Product Bottle"
                                    loading="eager"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur rounded-lg p-4 shadow-lg border border-slate-100">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex text-yellow-400 mb-1">★★★★★</div>
                                            <span className="text-xs font-bold text-slate-600">4.9/5 Rating</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold text-slate-900">14,357+</span>
                                            <span className="text-xs text-slate-500">Verified Customers</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FEATURED REVIEWS (BELOW HERO) */}
            <section className="bg-slate-50 py-12 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <h3 className="text-center text-slate-500 font-semibold uppercase tracking-wider mb-8 text-sm">Verified Reviews from Verified Buyers</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {featuredReviews.map((review, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex text-yellow-400">★★★★★</div>
                                    <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full flex items-center gap-1">
                                        <ShieldCheck className="w-3 h-3" /> Verified Purchase
                                    </span>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">"{review.quote}"</h4>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">"{review.text}"</p>
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-sm font-semibold text-slate-900">{review.name}</span>
                                    <div className="flex items-center text-xs text-slate-400">
                                        <MapPin className="w-3 h-3 mr-1" /> {review.location}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROBLEM & SOLUTION */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto space-y-16">
                    {/* Problem */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-slate-900">{PROBLEM_SECTION.title}</h2>
                        <div className="prose prose-lg text-slate-600">
                            {PROBLEM_SECTION.text.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                        <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-slate-100">
                            <img src="https://placehold.co/800x400/f8fafc/64748b?text=Healthy+Feet+Visual" alt="Healthy feet context" loading="lazy" className="w-full" />
                        </div>
                    </div>

                    {/* Solution */}
                    <div className="space-y-6 bg-emerald-50/50 p-8 rounded-2xl border border-emerald-100">
                        <h2 className="text-3xl font-bold text-emerald-900">{SOLUTION_SECTION.title}</h2>
                        <div className="prose prose-lg text-slate-700">
                            {SOLUTION_SECTION.text.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                    </div>
                </div>
            </section>

            {/* INGREDIENTS */}
            <section className="py-16 px-4 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Inside Every Drop: Simple, Natural Science</h2>
                        <p className="text-lg text-slate-600">A bespoke powerful formula that brings together special high-quality oils and minerals.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INGREDIENTS.map((ing, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
                                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">
                                    {ing.name.charAt(0)}
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{ing.name}</h3>
                                <p className="text-sm text-slate-600">{ing.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SCIENCE */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-900 text-white p-8 md:p-12 rounded-2xl shadow-2xl">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-sm">
                                <AlertTriangle className="w-4 h-4" /> New Research
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold">{SCIENCE_SECTION.title}</h2>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                {SCIENCE_SECTION.content.map((p, i) => <p key={i}>{p}</p>)}
                            </div>
                        </div>
                        <div className="shrink-0">
                            <img src="https://placehold.co/300x300/334155/ffffff?text=Doctor+Microscope" alt="Scientific Research" className="rounded-xl shadow-lg border border-slate-700 w-64 h-64 object-cover" loading="lazy" />
                        </div>
                    </div>
                </div>
            </section>

            {/* MORE REVIEWS */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Real Stories from Real Customers</h2>
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                        {otherReviews.map((review, i) => (
                            <div key={i} className="break-inside-avoid bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex text-yellow-500">★★★★★</div>
                                    <span className="text-xs text-slate-400 flex items-center"><Check className="w-3 h-3 mr-1" /> Verified</span>
                                </div>
                                <p className="text-slate-700 italic mb-4">{review.text}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-sm">{review.name}</div>
                                        <div className="text-xs text-slate-500">{review.location}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* PROS & CONS */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Is Kerassentials Right For You?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Pros */}
                        <div className="bg-emerald-50/30 rounded-2xl p-8 border border-emerald-100">
                            <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2">
                                <Check className="w-6 h-6" /> PROS
                            </h3>
                            <ul className="space-y-6">
                                {PROS_CONS.pros.map((item, i) => (
                                    <li key={i}>
                                        <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                                        <div className="text-sm text-slate-600">{item.text}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cons */}
                        <div className="bg-orange-50/30 rounded-2xl p-8 border border-orange-100">
                            <h3 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6" /> CONS
                            </h3>
                            <ul className="space-y-6">
                                {PROS_CONS.cons.map((item, i) => (
                                    <li key={i}>
                                        <div className="font-bold text-slate-900 text-sm">{item.title}</div>
                                        <div className="text-sm text-slate-600">{item.text}</div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(i)}
                                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                                >
                                    {faq.q}
                                    {openFaq === i ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                </button>
                                {openFaq === i && (
                                    <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-20 px-4 bg-emerald-900 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/100x100/ffffff/ffffff?text=Pattern')]"></div>
                <div className="relative z-10 max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">Fight Nail Fungus. Naturally.</h2>
                    <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
                        Join thousands of others who have reclaimed their confidence. Backed by a 60-day money-back guarantee.
                    </p>
                    <div className="pt-4">
                        <a
                            href={AFFILIATE_LINK}
                            className="inline-block w-full sm:w-auto bg-white hover:bg-emerald-50 text-emerald-900 text-xl font-bold py-5 px-12 rounded-lg shadow-2xl hover:scale-105 transition-transform"
                        >
                            ORDER NOW & SAVE &rsaquo;
                        </a>
                    </div>
                </div>
            </section>

            {/* REFERENCES */}
            <section className="py-12 px-4 bg-slate-100 text-slate-400 border-t border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <details className="group">
                        <summary className="flex items-center cursor-pointer text-xs font-bold uppercase tracking-wider hover:text-slate-600 transition-colors mb-4">
                            View Scientific References <ChevronDown className="w-4 h-4 ml-1 group-open:rotate-180 transition-transform" />
                        </summary>
                        <div className="grid md:grid-cols-2 gap-4 text-[10px] leading-tight">
                            <ul className="space-y-2">
                                {REFERENCES.slice(0, Math.ceil(REFERENCES.length / 2)).map((ref, i) => <li key={i}>{ref}</li>)}
                            </ul>
                            <ul className="space-y-2">
                                {REFERENCES.slice(Math.ceil(REFERENCES.length / 2)).map((ref, i) => <li key={i}>{ref}</li>)}
                            </ul>
                        </div>
                        <p className="mt-6 text-[10px] text-center italic">
                            *The company is not endorsed by, sponsored by, or affiliated with any of these organizations. This content is for informational purposes only.
                        </p>
                    </details>
                </div>
            </section>

            {/* POLICIES */}
            <section className="bg-white border-t border-slate-200 py-12 px-4">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-3 p-4">
                        <Truck className="w-8 h-8 mx-auto text-emerald-600" />
                        <h4 className="font-bold text-slate-900">Fast Shipping</h4>
                        <p className="text-sm text-slate-500">{POLICY_TEXT.shipping}</p>
                    </div>
                    <div className="space-y-3 p-4">
                        <ShieldCheck className="w-8 h-8 mx-auto text-emerald-600" />
                        <h4 className="font-bold text-slate-900">Money Back Guarantee</h4>
                        <p className="text-sm text-slate-500">{POLICY_TEXT.guarantee}</p>
                    </div>
                    <div className="space-y-3 p-4">
                        <Lock className="w-8 h-8 mx-auto text-emerald-600" />
                        <h4 className="font-bold text-slate-900">Secure Purchase</h4>
                        <p className="text-sm text-slate-500">{POLICY_TEXT.returns}</p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
