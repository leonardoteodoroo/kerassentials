import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { AlertTriangle, ShieldCheck, Ban, FileText, Lock, CalendarCheck, CheckCircle2, Loader2, Award, Factory, X } from 'lucide-react';
import Footer from './Footer';

/**
 * CONFIGURATION FOR ASPECT RATIO & SCALING
 */
const BASE_WIDTH = 850;
const BASE_HEIGHT = 710;
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
    onDismiss: () => void;
}

const UrgentModal: React.FC<UrgentModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    onSecondaryAction,
    onDismiss,
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
            const target = 100;
            const duration = 3500;
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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden" aria-modal="true" role="dialog" aria-labelledby="modal-title">
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
                    {/* CARD CONTENT - Scrollable Layout for Compliance */}
                    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10 custom-scrollbar">

                        {/* 1. HEADLINE - Compacted Padding */}
                        <header className="shrink-0 bg-alert px-5 py-3 text-white shadow-md relative z-10 flex items-center justify-center gap-3">
                            {/* Close button that redirects */}
                            <button
                                onClick={onDismiss}
                                className="absolute right-3 top-3 rounded-full bg-black/30 p-1.5 text-white shadow-lg transition-all hover:bg-black/60 hover:scale-110 active:scale-95"
                                aria-label="Close modal"
                            >
                                <X size={20} strokeWidth={3} aria-hidden="true" />
                            </button>
                            <AlertTriangle className="h-8 w-8 shrink-0 text-white" strokeWidth={2} aria-hidden="true" />
                            <div className="flex flex-row items-center gap-2 text-left">
                                <h2 id="modal-title" className="text-[20px] font-bold uppercase tracking-wide text-white leading-tight whitespace-nowrap">
                                    URGENT CONSUMER ALERT:
                                </h2>
                                <p className="text-[28px] font-black uppercase text-yellow-300 leading-none tracking-tight whitespace-nowrap">
                                    2026 BATCH VERIFICATION
                                </p>
                            </div>
                        </header>

                        {/* 2. SECURITY CONTEXT - Compacted */}
                        <div className="shrink-0 bg-gray-900 px-4 py-1.5 text-center relative z-20 border-b border-gray-800">
                            <p className="flex items-center justify-center gap-1.5 text-[14px] uppercase tracking-widest text-gray-400 font-semibold">
                                <CheckCircle2 className="h-3 w-3 text-blue-500" aria-hidden="true" />
                                <span>Official Product Identity:</span>
                                <span className="text-white font-bold tracking-wider">Kerassentials™</span>
                            </p>
                        </div>

                        {/* 3. MAIN BODY - Flex Grow, No Scroll */}
                        <div className="flex-1 flex flex-col justify-center gap-2 bg-gray-50 px-6 py-2">

                            {/* Top Warning Box - Reduced Margins/Padding */}
                            <div className="rounded-lg border border-gray-200 bg-white p-2.5 shadow-sm">
                                <div className="mb-1.5 flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
                                    <FileText className="h-3.5 w-3.5 text-gray-600" aria-hidden="true" />
                                    <span className="text-[14px] font-bold uppercase tracking-wider text-gray-600">
                                        Independent Market Analysis
                                    </span>
                                </div>
                                {/* Increased readability, adjusted line-height */}
                                <p className="text-[20px] font-medium leading-normal text-gray-800">
                                    <span className="text-alert font-bold">CRITICAL:</span> Counterfeit bottles detected on Amazon & Walmart contain "unknown fillers" linked to severe skin irritation.
                                </p>
                            </div>

                            <p className="text-center text-[20px] font-semibold text-gray-600 leading-tight">
                                Secure the Deep-Penetrating Formula directly from the FDA-Registered Facility.
                            </p>

                            {/* Comparison Visuals - Grid Layout */}
                            <div className="grid grid-cols-2 gap-3 items-stretch">

                                {/* BAD OPTION */}
                                <div className="relative rounded-lg border border-red-200 bg-red-50 p-3 shadow-sm flex flex-col justify-start">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-red-100 p-1.5 shrink-0">
                                            <Ban className="h-5 w-5 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-[20px] font-bold text-red-800 leading-none">Third-Party Resellers</h3>
                                            <p className="text-[16px] text-red-700 font-medium leading-tight m-0">(Amazon / eBay / Walmart)</p>
                                            <ul className="m-0 p-0 space-y-1.5 mt-1">
                                                <li className="text-[17px] leading-tight text-gray-700 flex items-start gap-1.5">
                                                    <span className="text-red-500 font-bold">•</span>
                                                    <span>Risk of ineffective results.</span>
                                                </li>
                                                <li className="text-[17px] leading-tight text-gray-700 flex items-start gap-1.5">
                                                    <span className="text-red-500 font-bold">•</span>
                                                    <span><span className="font-bold">NO</span> Refund Validity.</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* GOOD OPTION */}
                                <div className="relative rounded-lg border-2 border-safe bg-green-50 p-3 shadow-md flex flex-col justify-start">
                                    <div className="absolute right-0 top-0 rounded-bl-lg bg-safe px-2.5 py-0.5 text-[13px] font-bold uppercase text-white tracking-wide">
                                        Recommended
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-green-100 p-1.5 shrink-0">
                                            <ShieldCheck className="h-5 w-5 text-safe" aria-hidden="true" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <h3 className="text-[20px] font-bold text-safe-dark leading-none">Official Manufacturer</h3>
                                            <p className="text-[16px] text-safe font-medium leading-tight m-0">(Direct from Facility)</p>
                                            <ul className="m-0 p-0 space-y-1.5 mt-1">
                                                <li className="text-[17px] leading-tight text-gray-800 flex items-start gap-1.5">
                                                    <span className="text-safe font-bold">•</span>
                                                    <span><strong>Fresh Batch Guarantee</strong>.</span>
                                                </li>
                                                <li className="text-[17px] leading-tight text-gray-800 flex items-start gap-1.5">
                                                    <span className="text-safe font-bold">•</span>
                                                    <span>60-Day Money-Back Guarantee.</span>
                                                </li>
                                                <li className="text-[17px] leading-tight text-gray-800 flex items-start gap-1.5">
                                                    <span className="text-safe font-bold">•</span>
                                                    <span>Use it all. If it fails, we refund you.*</span>
                                                </li>
                                            </ul>

                                            {/* Trust Badges */}
                                            <div className="mt-2.5 flex items-center gap-2">
                                                <div className="flex items-center gap-1.5 rounded border border-yellow-300 bg-yellow-50 px-2 py-1 shadow-sm">
                                                    <Award size={12} className="text-yellow-600" aria-hidden="true" />
                                                    <div className="flex flex-col leading-[1.1]">
                                                        <span className="text-[11px] font-black uppercase text-yellow-800">GMP</span>
                                                        <span className="text-[10px] font-bold uppercase text-yellow-700">Certified</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1.5 rounded border border-blue-300 bg-blue-50 px-2 py-1 shadow-sm">
                                                    <Factory size={12} className="text-blue-600" aria-hidden="true" />
                                                    <div className="flex flex-col leading-[1.1]">
                                                        <span className="text-[11px] font-black uppercase text-blue-800">FDA</span>
                                                        <span className="text-[10px] font-bold uppercase text-blue-700">Registered</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* 4. FOOTER - Fixed Height */}
                        <footer className="shrink-0 border-t border-gray-200 bg-white px-6 pt-2 pb-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">

                            {/* Progress Bar */}
                            <div className="mb-2.5 w-full">
                                <div className="mb-1 flex items-end justify-between px-0.5">
                                    <span className="text-[14px] font-bold uppercase tracking-widest text-gray-600">
                                        Verifying Authenticity...
                                    </span>
                                    <span className={`text-[14px] font-black uppercase tracking-widest ${isVerified ? 'text-safe' : 'text-gray-600'}`}>
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
                                        ? 'bg-safe hover:scale-[1.02] active:scale-[0.98] cursor-pointer animate-pulse-action'
                                        : 'bg-gray-400 cursor-not-allowed opacity-80'
                                    }`}
                            >
                                {isVerified ? (
                                    <>
                                        <div className="absolute inset-0 animate-pulse bg-white/10"></div>
                                        <span className="relative z-10 text-[28px] font-black uppercase tracking-wide text-white leading-none">
                                            Activate Protection
                                        </span>
                                        <span className="relative z-10 text-[14px] font-medium text-white mt-0.5">
                                            & Order Securely
                                        </span>
                                    </>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin text-white/80" aria-hidden="true" />
                                        <span className="text-[25px] font-bold uppercase tracking-wide text-white/90">
                                            Please Wait...
                                        </span>
                                    </div>
                                )}
                            </button>

                            {/* Feedback Button */}
                            <button
                                onClick={onSecondaryAction}
                                className="mt-3 w-full rounded-full border border-yellow-500 bg-yellow-400 py-2 text-[16px] font-black uppercase tracking-widest text-gray-900 shadow-sm transition-all hover:bg-yellow-300 active:scale-95"
                            >
                                FEEDBACK
                            </button>

                            {/* Bottom Meta */}
                            <div className="mt-2.5 flex items-center justify-between">
                                {/* Badges */}
                                <div className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-tight text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Lock size={9} strokeWidth={2.5} aria-hidden="true" />
                                        <span>256-BIT SECURE</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarCheck size={9} strokeWidth={2.5} aria-hidden="true" />
                                        <span>VERIFIED: {currentDate}</span>
                                    </div>
                                </div>

                                {/* Session */}
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-[13px] text-gray-600">
                                        <span className="relative flex h-1.5 w-1.5">
                                            <span className={`absolute inline-flex h-full w-full rounded-full ${isVerified ? 'animate-ping bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
                                            <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${isVerified ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        </span>
                                        <span className="font-bold tracking-wider">
                                            {isVerified ? 'ONLINE' : 'CONNECTING...'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={onDismiss}
                                        className="relative text-[13px] font-black uppercase tracking-widest text-gray-900 hover:text-alert transition-colors underline underline-offset-4 decoration-2 p-4 -m-4"
                                        aria-label="Close modal"
                                    >
                                        CLOSE
                                    </button>
                                </div>
                            </div>

                        </footer>

                        {/* 5. COMPLIANCE FOOTER (Scrollable area) */}
                        <div className="border-t border-gray-200 bg-gray-50">
                            <Footer />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrgentModal;