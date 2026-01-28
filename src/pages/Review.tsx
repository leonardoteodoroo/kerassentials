import { useEffect, useState } from 'react';
import { Star, Check, ShieldCheck, MapPin, ChevronDown, ChevronUp, Lock, Truck, AlertTriangle } from 'lucide-react';
import Footer from '../components/Footer';
import {
    AFFILIATE_LINK, HERO_CONTENT, PROBLEM_SECTION, SOLUTION_SECTION,
    INGREDIENTS, SCIENCE_SECTION, SHORT_REVIEWS, DETAILED_REVIEWS, PROS_CONS, FAQS, REFERENCES, POLICY_TEXT, PRICING_OPTIONS, BONUS_BOOKS,
    MECHANISM_STEPS, HOW_TO_USE
} from '../data/reviewData';

export default function Review() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const toggleFaq = (index: number) => setOpenFaq(openFaq === index ? null : index);

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

            {/* SHORT REVIEWS SECTON (TOP) */}
            <section className="bg-slate-50 py-12 border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4">
                    <h3 className="text-center text-slate-500 font-semibold uppercase tracking-wider mb-8 text-sm">Verified Reviews from Verified Buyers</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {SHORT_REVIEWS.map((review, idx) => (
                            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex text-yellow-400">★★★★★</div>
                                    {review.extraInfo && (
                                        <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3" /> {review.extraInfo}
                                        </span>
                                    )}
                                </div>
                                <h4 className="font-bold text-slate-900 mb-2">{review.quote}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed mb-4">{review.text}</p>
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
                        <div className="prose prose-lg text-slate-700 mb-8">
                            {SOLUTION_SECTION.text.map((p, i) => <p key={i}>{p}</p>)}
                        </div>

                        {/* Mechanism Steps */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            {MECHANISM_STEPS.map((step, idx) => (
                                <div key={idx} className="text-center relative">
                                    <div className="w-12 h-12 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm border border-emerald-100 text-emerald-600 font-bold text-lg mb-2 z-10 relative">
                                        {idx + 1}
                                    </div>
                                    {idx < MECHANISM_STEPS.length - 1 && (
                                        <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-emerald-200 -z-0"></div>
                                    )}
                                    <h4 className="font-bold text-emerald-900 text-sm">{step.title}</h4>
                                    <p className="text-xs text-emerald-700">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* SCIENCE */}
            <section className="py-16 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-slate-900 text-white p-8 md:p-12 rounded-2xl shadow-2xl">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-widest text-sm">
                                <AlertTriangle className="w-4 h-4" /> Dec 2023 – New Scientific Discovery
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

            {/* DETAILED STORIES (MIDDLE SECTION) */}
            <section className="py-16 px-4 bg-slate-50 border-y border-slate-200">
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-center text-3xl font-bold text-slate-900 mb-12">🛡️ Verified User Intelligence & Success Stories</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {DETAILED_REVIEWS.map((review, idx) => (
                            <div key={idx} className="contents">
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-100 flex flex-col h-full relative">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex text-yellow-400">★★★★★</div>
                                        {review.extraInfo && (
                                            <span className="text-xs font-bold text-emerald-600 px-2 py-0.5 bg-emerald-50 rounded-full flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> {review.extraInfo}
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="font-bold text-slate-800 mb-3 italic text-xl">{review.title}</h4>
                                    <p className="text-base text-slate-600 leading-relaxed mb-6 flex-grow">{review.text}</p>
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-100">
                                        <span className="font-bold text-slate-900">{review.name}</span>
                                        <div className="flex items-center text-xs text-slate-500">
                                            <MapPin className="w-3 h-3 mr-1" /> {review.location}
                                        </div>
                                    </div>
                                </div>

                                {/* Insert Button after specific items (idx 1 (2nd), idx 3 (4th), idx 5 (6th)) */}
                                {idx === 1 && (
                                    <div className="md:col-span-2 text-center py-8">
                                        <a href={AFFILIATE_LINK} className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase text-sm md:text-lg animate-pulse">
                                            ➔ CHECK OFFICIAL BATCH AVAILABILITY (72.63% OFF)
                                        </a>
                                    </div>
                                )}
                                {idx === 3 && (
                                    <div className="md:col-span-2 text-center py-8">
                                        <a href={AFFILIATE_LINK} className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase text-sm md:text-lg animate-pulse">
                                            ➔ SECURE YOUR AUTHORIZED BOTTLE NOW
                                        </a>
                                    </div>
                                )}
                                {idx === 5 && (
                                    <div className="md:col-span-2 text-center py-8">
                                        <a href={AFFILIATE_LINK} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all uppercase text-sm md:text-lg animate-pulse">
                                            ➔ GET THE OFFICIAL DISCOUNT & 60-DAY GUARANTEE
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* INGREDIENTS */}
            <section className="py-16 px-4 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Inside Every Drop: Simple, Natural Science</h2>
                        <p className="text-lg text-slate-600">A bespoke powerful formula that brings together special high-quality oils and minerals.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {INGREDIENTS.map((ing, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
                                <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">
                                    {ing.name.charAt(0)}
                                </div>
                                <h3 className="font-bold text-lg text-slate-900 mb-2">{ing.name}</h3>
                                <p className="text-sm text-emerald-700 font-medium">{ing.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* How to Use Section */}
                    <div className="bg-emerald-900 text-white rounded-2xl p-8 md:p-12 shadow-xl">
                        <h3 className="text-2xl font-bold text-center mb-8">How to Use Kerassentials</h3>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            {HOW_TO_USE.map((step, idx) => (
                                <div key={idx} className="space-y-3">
                                    <div className="w-10 h-10 mx-auto bg-white text-emerald-900 rounded-full flex items-center justify-center font-bold text-lg">
                                        {idx + 1}
                                    </div>
                                    <h4 className="font-bold text-xl">{step.title}</h4>
                                    <p className="text-emerald-100">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* BONUS SECTION (MOVED HERE) */}
            <section className="py-16 px-4 bg-slate-50 border-y border-slate-200">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-2">Order 6 Bottles and Get 3 FREE Bonuses</h2>
                        <p className="text-lg text-emerald-600 font-semibold italic">+ A Surprise Gift Included!</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {BONUS_BOOKS.map((book, idx) => (
                            <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 flex flex-col hover:shadow-xl transition-shadow">
                                {/* Image Container */}
                                <div className="relative bg-slate-100 aspect-[4/5] overflow-hidden group border-b border-slate-100">
                                    <img
                                        src={book.image}
                                        alt={book.subtitle}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-4 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest shadow-md">
                                        Digital Download
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow">
                                    {/* Emerald Banner */}
                                    <div className="bg-emerald-600 text-white font-bold py-2 px-4 text-xs uppercase tracking-wider text-center">
                                        {book.title}
                                    </div>

                                    {/* Title Area */}
                                    <div className="px-4 py-4 min-h-[60px] flex items-center justify-center border-b border-slate-50">
                                        <h4 className="text-slate-800 font-bold text-sm leading-tight text-center">
                                            {book.subtitle}
                                        </h4>
                                    </div>

                                    {/* Price & Description */}
                                    <div className="p-6 text-slate-600 flex flex-col flex-grow bg-white">
                                        <div className="text-center mb-4">
                                            <span className="text-sm text-slate-400 font-bold line-through mr-2">RRP ${book.value}</span>
                                            <span className="text-lg font-bold text-emerald-600">FREE</span>
                                        </div>
                                        <p className="text-sm leading-relaxed text-slate-500 text-center">
                                            {book.description}
                                        </p>
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
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">Is Kerassentials The Right Choice For You?</h2>
                    <p className="text-center text-slate-500 mb-12 italic">(A honest reality check before you secure the 2026 Batch)</p>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Pros */}
                        <div className="bg-emerald-50/30 rounded-2xl p-8 border border-emerald-100">
                            <h3 className="text-xl font-bold text-emerald-800 mb-6 flex items-center gap-2 uppercase tracking-wide">
                                <Check className="w-6 h-6" /> This Protocol Is Perfect For You If:
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
                            <h3 className="text-xl font-bold text-orange-800 mb-6 flex items-center gap-2 uppercase tracking-wide">
                                <AlertTriangle className="w-6 h-6" /> This Is NOT For You If:
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

            {/* PRICING SECTION - ADVANCED UX REDESIGN */}
            <section className="py-24 px-4 bg-slate-50 relative overflow-hidden" id="pricing">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-50/50 via-slate-50/20 to-slate-50"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            Verified Official Store
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
                            Start Your Transformation
                        </h2>
                        <p className="text-xl text-slate-600 leading-relaxed">
                            Join over <span className="font-bold text-slate-900">14,000+ happy customers</span>. <br className="hidden md:block" />
                            Select the package that fits your goals. <br className="hidden md:block" />
                            <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-2 py-1 rounded mt-2 inline-block">Most people choose 3 or 6 bottles for best results</span>
                        </p>
                        <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-slate-500">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Try it risk-free — 60-day money-back
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto items-end">
                        {PRICING_OPTIONS.map((option) => {
                            const isBestValue = option.id === 'best-value';

                            return (
                                <div
                                    key={option.id}
                                    className={`relative flex flex-col w-full transition-all duration-300 group
                                        ${isBestValue
                                            ? 'bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] ring-1 ring-slate-200 z-10 md:-mb-8 md:-top-8'
                                            : 'bg-white rounded-2xl shadow-xl border border-slate-100'
                                        }`}
                                >
                                    {isBestValue && (
                                        <div className="absolute -top-5 left-0 right-0 mx-auto w-max px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-lg flex items-center gap-2">
                                            <Star className="w-3 h-3 fill-current" /> Most Intelligent Choice
                                        </div>
                                    )}

                                    {/* Card Header & Image */}
                                    <div className={`p-8 pb-0 flex flex-col items-center ${isBestValue ? 'pt-12' : 'pt-8'}`}>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{option.title}</h3>
                                        <p className="text-sm text-slate-500 font-medium tracking-wide uppercase mb-6">{option.supply}</p>

                                        <div className="relative w-full aspect-[4/3] flex items-center justify-center mb-6">
                                            {/* Product Image Placeholder - Dynamic Stacking */}
                                            <div className="relative z-10 w-48 transition-transform duration-500 group-hover:scale-105">
                                                <img
                                                    src={`https://placehold.co/400x320/transparent/transparent?text=${option.totalBottles}+Bottles`}
                                                    alt={`${option.totalBottles} Bottles`}
                                                    className="w-full drop-shadow-2xl"
                                                />
                                            </div>
                                            {/* Glow Effect behind image */}
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl opacity-50 
                                                ${isBestValue ? 'bg-emerald-200' : 'bg-slate-100'}`}></div>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="px-8 pb-8 text-center border-b border-slate-50">
                                        <div className="flex items-baseline justify-center gap-1 text-slate-900 mb-2">
                                            <span className="text-2xl font-semibold opacity-60">$</span>
                                            <span className="text-6xl font-extrabold tracking-tight">{option.pricePerBottle}</span>
                                            <span className="text-lg text-slate-400 font-medium">/bottle</span>
                                        </div>
                                        <div className="text-sm text-slate-400 line-through mb-4">
                                            Regular Price: ${Math.round(option.originalPrice / option.totalBottles)}/bottle
                                        </div>

                                        {/* Savings Pill */}
                                        <div className={`inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg text-sm font-bold
                                            ${isBestValue ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                                            You Save ${option.savings} Today
                                        </div>
                                    </div>

                                    {/* Features List - Clean Design (No Boxes) */}
                                    <div className="p-8 bg-slate-50/50 rounded-b-3xl flex-grow flex flex-col">
                                        <ul className="space-y-4 mb-8 text-left">
                                            {/* Quantity Feature */}
                                            <li className="flex items-start gap-3 text-slate-700 font-medium">
                                                <div className={`mt-1 p-0.5 rounded-full ${isBestValue ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                </div>
                                                <span>
                                                    <strong className="text-slate-900">{option.totalBottles} Bottles</strong> Shipped
                                                </span>
                                            </li>

                                            {/* Dynamic Features */}
                                            {option.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-700">
                                                    <div className={`mt-1 p-0.5 rounded-full ${isBestValue ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                        <Check className="w-3 h-3" strokeWidth={3} />
                                                    </div>
                                                    <span className={feature.toLowerCase().includes('free') || feature.toLowerCase().includes('gift') ? 'font-bold text-slate-900' : ''}>
                                                        {feature}
                                                    </span>
                                                </li>
                                            ))}

                                            {/* Shipping Feature */}
                                            <li className="flex items-start gap-3 text-slate-700">
                                                <div className={`mt-1 p-0.5 rounded-full ${isBestValue ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                    <Check className="w-3 h-3" strokeWidth={3} />
                                                </div>
                                                <span>
                                                    {option.shipping === 0 ? 'Free US Shipping' : 'Small Shipping Fee'}
                                                </span>
                                            </li>
                                        </ul>

                                        <div className="mt-auto">
                                            <a
                                                href={AFFILIATE_LINK}
                                                className={`w-full group/btn relative flex items-center justify-center gap-3 py-5 rounded-xl font-bold text-lg uppercase tracking-wider shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]
                                                    ${isBestValue
                                                        ? 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-emerald-200 hover:shadow-emerald-300'
                                                        : 'bg-white text-slate-900 border-2 border-slate-900 hover:bg-slate-900 hover:text-white'
                                                    }`}
                                            >
                                                BUY NOW
                                                <span className={`flex items-center justify-center w-6 h-6 rounded-full transition-colors ${isBestValue ? 'bg-emerald-800 text-emerald-200 group-hover/btn:bg-white group-hover/btn:text-emerald-700' : 'bg-slate-100 text-slate-900 group-hover/btn:bg-white/20 group-hover/btn:text-white'}`}>
                                                    <ChevronDown className="w-4 h-4 -rotate-90" />
                                                </span>
                                            </a>

                                            {/* Total Price Subtext */}
                                            <p className="mt-4 text-center text-xs text-slate-400">
                                                Total Investment: <span className="font-bold text-slate-900">${option.totalPrice}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-20 pt-10 border-t border-slate-200">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center opacity-70 mix-blend-multiply">
                            <div className="flex flex-col items-center gap-2">
                                <ShieldCheck className="w-8 h-8 text-slate-400" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secure Payment</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Truck className="w-8 h-8 text-slate-400" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Fast & Free Shipping</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <img src="https://placehold.co/80x30/transparent/64748b?text=GMP" alt="GMP" className="h-8 grayscale opacity-60" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">GMP Certified</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <img src="https://placehold.co/80x30/transparent/64748b?text=FDA" alt="FDA" className="h-8 grayscale opacity-60" />
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">FDA Registered</span>
                            </div>
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
