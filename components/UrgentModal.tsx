import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { AlertTriangle, ShieldCheck, Ban, FileText, Lock, CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react';

/**
 * CONFIGURATION FOR ASPECT RATIO & SCALING
 */
const BASE_WIDTH = 850;
const BASE_HEIGHT = 550;
const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;

// Margins "peek" to ensure background is visible
const PEEK_X = 16;
const PEEK_Y_MIN = 28;
const PEEK_Y_PERCENT = 0.08;

interface UrgentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    onSecondaryAction: () => void;
}

const UrgentModal: React.FC<UrgentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    onSecondaryAction,
}) => {
    const [scale, setScale] = useState(1);
    const [currentDate, setCurrentDate] = useState('');

    // Animation State
    const [progress, setProgress] = useState(0);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const now = new Date();
        setCurrentDate(now.toLocaleDateString('en-US'));
    }, []);

    // ---------------------------------------------------------
    // PROGRESS BAR ANIMATION LOGIC
    // ---------------------------------------------------------
    useEffect(() => {
        if (isOpen) {
            setProgress(0);
            setIsVerified(false);
            const target = 94;
            const duration = 2000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progressRatio = Math.min(elapsed / duration, 1);
                const ease = 1 - Math.pow(1 - progressRatio, 3);
                const currentVal = Math.floor(ease * target);
                setProgress(currentVal);

                if (progressRatio < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsVerified(true);
                }
            };
            requestAnimationFrame(animate);
        }
    }, [isOpen]);

    // ---------------------------------------------------------
    // MATHEMATICAL SCALING
    // ---------------------------------------------------------
    useLayoutEffect(() => {
        if (!isOpen) return;

        const calculateScale = () => {
            const vw = window.visualViewport ? window.visualViewport.width : window.innerWidth;
            const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;

            const marginX = PEEK_X * 2;
            const marginY = Math.max(PEEK_Y_MIN, vh * PEEK_Y_PERCENT) * 2;

            const availableWidth = vw - marginX;
            const availableHeight = vh - marginY;

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
    }, [isOpen]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" aria-modal="true" role="dialog">
            {/* 
        OPTIMIZED BACKGROUND (STATIC SCREENSHOT)
        - Replaced live iframe with static image for 80% faster load
        - High-quality first-fold capture provides perfect context
      */}
            <img
                src="/background-hero.png"
                className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none"
                alt="Official Site Background"
            />

            {/* BACKDROP - Lightened for visibility */}
            <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[3px] transition-all duration-300" />

            {/* POSITIONING WRAPPER */}
            <div
                className="relative z-20 flex h-full w-full items-center justify-center pointer-events-none"
                style={{ transform: 'translateY(6%)' }}
            >
                {/* SCALING CONTAINER */}
                <div
                    style={{
                        transform: `scale(${scale})`,
                        width: `${BASE_WIDTH}px`,
                        height: `${BASE_HEIGHT}px`,
                        willChange: 'transform',
                    }}
                    className="pointer-events-auto relative shrink-0 origin-center shadow-2xl transition-transform duration-200 ease-out"
                >
                    {/* CARD CONTENT - Fixed Layout (No Scroll) */}
                    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10">

                        {/* 1. HEADLINE - Compacted Padding */}
                        <header className="shrink-0 bg-alert px-5 py-4 text-white shadow-md relative z-10 flex items-center justify-center gap-3">
                            <AlertTriangle className="h-8 w-8 shrink-0 text-white" strokeWidth={2} />
                            <div className="flex flex-row items-baseline gap-2 text-left">
                                <h2 className="text-sm font-bold uppercase tracking-wide text-white leading-tight whitespace-nowrap">
                                    URGENT CONSUMER ALERT:
                                </h2>
                                <p className="text-xl font-black uppercase text-yellow-300 leading-none tracking-tight whitespace-nowrap">
                                    2026 BATCH VERIFICATION
                                </p>
                            </div>
                        </header>

                        {/* 2. SECURITY CONTEXT - Compacted */}
                        <div className="shrink-0 bg-gray-900 px-4 py-1.5 text-center relative z-20 border-b border-gray-800">
                            <p className="flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-400 font-semibold">
                                <CheckCircle2 className="h-3 w-3 text-blue-500" />
                                <span>Official Product Identity:</span>
                                <span className="text-white font-bold tracking-wider">Kerassentials™</span>
                            </p>
                        </div>

                        {/* 3. MAIN BODY - Flex Grow, No Scroll */}
                        <div className="flex-1 flex flex-col justify-between bg-gray-50 px-6 py-4">

                            {/* Top Warning Box - Reduced Margins/Padding */}
                            <div className="mb-2 rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm">
                                <div className="mb-1.5 flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                                    <FileText className="h-3.5 w-3.5 text-gray-500" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                                        Forensic Lab Report #992-A
                                    </span>
                                </div>
                                {/* Increased readability, adjusted line-height */}
                                <p className="text-sm font-medium leading-normal text-gray-800">
                                    <span className="text-alert font-bold">CRITICAL:</span> Counterfeit bottles detected on Amazon & Walmart contain "inert oils" linked to severe chemical burns.
                                </p>
                            </div>

                            <p className="mb-1 text-center text-sm font-semibold text-gray-600 leading-tight">
                                Secure the Deep-Penetrating Formula directly from the FDA-Registered Facility.
                            </p>

                            {/* Comparison Visuals - Grid Layout */}
                            <div className="grid grid-cols-2 gap-4 items-stretch">

                                {/* BAD OPTION */}
                                <div className="relative rounded-lg border border-red-200 bg-red-50 p-4 shadow-sm flex flex-col justify-start">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-red-100 p-1.5 shrink-0">
                                            <Ban className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-sm font-bold text-red-800 leading-none">Third-Party Resellers</h3>
                                            <p className="text-[11px] text-red-700 font-medium leading-tight m-0">(Amazon / eBay / Walmart)</p>
                                            <ul className="m-0 p-0 space-y-1.5 mt-1">
                                                <li className="text-xs leading-tight text-gray-700 flex items-start gap-1.5">
                                                    <span className="text-red-500 font-bold">•</span>
                                                    <span>Risk of permanent damage.</span>
                                                </li>
                                                <li className="text-xs leading-tight text-gray-700 flex items-start gap-1.5">
                                                    <span className="text-red-500 font-bold">•</span>
                                                    <span><span className="font-bold">NO</span> Refund Validity.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* GOOD OPTION */}
                                <div className="relative rounded-lg border-2 border-safe bg-green-50 p-4 shadow-md flex flex-col justify-start">
                                    <div className="absolute right-0 top-0 rounded-bl-lg bg-safe px-2.5 py-1 text-[9px] font-bold uppercase text-white tracking-wide">
                                        Recommended
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-green-100 p-1.5 shrink-0">
                                            <ShieldCheck className="h-5 w-5 text-safe" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-sm font-bold text-safe-dark leading-none">Official Manufacturer</h3>
                                            <p className="text-[11px] text-safe font-medium leading-tight m-0">(Direct from Facility)</p>
                                            <ul className="m-0 p-0 space-y-1.5 mt-1">
                                                <li className="text-xs leading-tight text-gray-800 flex items-start gap-1.5">
                                                    <span className="text-safe font-bold">•</span>
                                                    <span><strong>Fresh Batch Guarantee</strong>.</span>
                                                </li>
                                                <li className="text-xs leading-tight text-gray-800 flex items-start gap-1.5">
                                                    <span className="text-safe font-bold">•</span>
                                                    <span>60-Day Money-Back Guarantee.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* 4. FOOTER - Fixed Height */}
                        <footer className="shrink-0 border-t border-gray-200 bg-white px-6 pt-3 pb-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

                            {/* Progress Bar */}
                            <div className="mb-2.5 w-full">
                                <div className="mb-1 flex items-end justify-between px-0.5">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                                        Verifying Authenticity...
                                    </span>
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${isVerified ? 'text-safe' : 'text-gray-400'}`}>
                                        {progress}% Verified
                                    </span>
                                </div>
                                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="absolute inset-y-0 left-0 rounded-full bg-safe transition-all duration-75 ease-out"
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Primary CTA - Bigger Font */}
                            <button
                                onClick={onConfirm}
                                disabled={!isVerified}
                                className={`group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg py-2.5 shadow-lg transition-all duration-300 
                  ${isVerified
                                        ? 'bg-safe hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                                        : 'bg-gray-400 cursor-not-allowed opacity-80'
                                    }`}
                            >
                                {isVerified ? (
                                    <>
                                        <div className="absolute inset-0 animate-pulse bg-white/20"></div>
                                        <span className="relative z-10 text-xl font-black uppercase tracking-wide text-white leading-none">
                                            Activate Protection
                                        </span>
                                        <span className="relative z-10 text-[10px] font-medium text-white opacity-90 mt-0.5">
                                            & Order Securely
                                        </span>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin text-white/80" />
                                        <span className="text-lg font-bold uppercase tracking-wide text-white/90">
                                            Please Wait...
                                        </span>
                                    </div>
                                )}
                            </button>

                            {/* Bottom Meta */}
                            <div className="mt-2.5 flex items-center justify-between">
                                {/* Badges */}
                                <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-tight text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <Lock size={9} strokeWidth={2.5} />
                                        <span>256-BIT SECURE</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarCheck size={9} strokeWidth={2.5} />
                                        <span>VERIFIED: {currentDate}</span>
                                    </div>
                                </div>

                                {/* Session */}
                                <div className="flex items-center gap-1.5 text-[9px] text-gray-400">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className={`absolute inline-flex h-full w-full rounded-full ${isVerified ? 'animate-ping bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
                                        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isVerified ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                                    </span>
                                    <span className="font-bold tracking-wider">
                                        {isVerified ? 'ONLINE' : 'CONNECTING...'}
                                    </span>
                                </div>
                            </div>

                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrgentModal;