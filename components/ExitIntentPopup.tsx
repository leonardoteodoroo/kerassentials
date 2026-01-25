import React, { useState, useEffect, useLayoutEffect } from 'react';

// CONFIGURATION FOR SCALING
const BASE_WIDTH = 480;  // Fixed width for the design (Adjusted for better fit)
const BASE_HEIGHT = 760; // Fixed height to fit all content comfortably
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;
const PEEK_MARGIN = 20;  // Margin to ensure it doesn't touch edges

export default function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const [scale, setScale] = useState(1);

    // Constants
    const TARGET_URL = "https://thekerassentials.com/text.php?aff_id=1119055";

    // ---------------------------------------------------------
    // MATHEMATICAL SCALING (Same as UrgentModal)
    // ---------------------------------------------------------
    useLayoutEffect(() => {
        // Only calculate if visible to save resources
        if (!isVisible) return;

        const calculateScale = () => {
            const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

            const margin = PEEK_MARGIN * 2;
            const availableWidth = vw - margin;
            const availableHeight = vh - margin;

            let targetW = availableWidth;
            let targetH = targetW / ASPECT_RATIO;

            if (targetH > availableHeight) {
                targetH = availableHeight;
                targetW = targetH * ASPECT_RATIO;
            }

            const computedScale = Math.min(targetW / BASE_WIDTH, 1);
            setScale(computedScale);
        };

        calculateScale();
        window.addEventListener('resize', calculateScale);
        if (window.visualViewport) window.visualViewport.addEventListener('resize', calculateScale);

        return () => {
            window.removeEventListener('resize', calculateScale);
            if (window.visualViewport) window.visualViewport.removeEventListener('resize', calculateScale);
        };
    }, [isVisible]);

    useEffect(() => {
        // 1. Desktop: Mouseleave event
        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        // 2. Mobile: History API (Back button interception)
        const handlePopState = () => {
            if (!hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                window.history.pushState(null, "", window.location.href);
            }
        };

        window.history.pushState(null, "", window.location.href);

        document.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [hasTriggered]);

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleCTA = () => {
        window.location.href = TARGET_URL;
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[20000] flex items-center justify-center overflow-hidden animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="exit-popup-title">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={handleClose}
            />

            {/* Scaling Wrapper - SCALING ONLY, NO ANIMATION */}
            <div
                className="relative z-10 flex items-center justify-center pointer-events-none"
                style={{ width: '100%', height: '100%' }}
            >
                <div
                    style={{
                        transform: `scale(${scale})`,
                        width: `${BASE_WIDTH}px`,
                        height: `${BASE_HEIGHT}px`,
                    }}
                    className="pointer-events-auto relative shrink-0 origin-center transition-transform duration-200 ease-out"
                >
                    {/* Main Content Container - ANIMATION HERE */}
                    <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-gray-900/5 animate-slide-up">

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute right-5 top-5 z-20 rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex h-full flex-col p-8">
                            {/* Header / Title */}
                            <div className="mb-6 pr-8">
                                <h2 id="exit-popup-title" className="text-[26px] font-bold text-gray-900 leading-tight">
                                    Look, let’s be completely honest for a second…
                                </h2>
                            </div>

                            {/* Body Text */}
                            <div className="flex-1 space-y-5 text-[17px] text-gray-600 leading-relaxed font-medium">
                                <p>
                                    I know you’ve probably seen dozens of reviews and ads for <span className="font-bold text-gray-900">Kerassentials</span> today. The truth is, there’s a <span className="font-bold text-alert bg-red-50 px-1 rounded">'red ocean' of unauthorized sellers</span> out there—people who don’t care about your health, only about making a quick profit.
                                </p>
                                <p>
                                    They flood the internet with <span className="italic">misleading information</span>, often leading well-intentioned people to buy <span className="font-bold text-alert">fake, diluted bottles</span> on Amazon, Walmart, or eBay.
                                </p>

                                <div className="bg-red-50 p-4 rounded-xl border border-red-100 text-gray-800 text-[15px] leading-snug shadow-sm">
                                    <span className="font-black text-alert uppercase tracking-wide">INCONTESTABLE FACT:</span> The manufacturer has officially warned that Kerassentials is <span className="font-black underline">NOT</span> sold on marketplaces.
                                </div>

                                <p>
                                    If you want to skip the noise and secure the only authorized batch, the official site is running a <span className="font-extrabold text-safe text-[18px]">72.63% discount today</span>.
                                </p>
                            </div>

                            {/* CTA Button */}
                            <div className="mt-8 shrink-0">
                                <button
                                    onClick={handleCTA}
                                    className="group relative w-full overflow-hidden rounded-xl bg-safe py-5 shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <div className="relative z-10 flex flex-col items-center justify-center leading-none">
                                        <span className="text-[22px] font-black text-white uppercase tracking-wide">Secure Authorized Batch</span>
                                        <span className="text-[12px] font-medium text-green-100 mt-1 uppercase tracking-widest opacity-90">60-Day Money-Back Guarantee</span>
                                    </div>

                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
                                </button>

                                <div className="mt-3 flex justify-center items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                    <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                    <span>Verified Official Link</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
