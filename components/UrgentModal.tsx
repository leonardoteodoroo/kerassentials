import React, { useState, useEffect, useLayoutEffect } from 'react';
import { AlertTriangle, ShieldCheck, Ban, FileText, Lock, CalendarCheck, CheckCircle2, Loader2 } from 'lucide-react';

/**
 * CONFIGURATION FOR ASPECT RATIO & SCALING
 * Restored Widescreen Base (850x550) for the Hybrid Layout
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
        AFFILIATE SITE BACKGROUND (IFRAME)
        - Preloads the site context
        - pointer-events-none ensures no interaction with the iframe
      */}
      <iframe
        src="https://thekerassentials.com/text.php?aff_id=1119055"
        className="absolute inset-0 h-full w-full object-cover z-0 pointer-events-none border-none"
        title="Official Site Background"
        loading="eager"
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
          className="pointer-events-auto relative shrink-0 origin-center shadow-2xl transition-transform duration-200 ease-out flex flex-col"
        >
          {/* CARD BODY */}
          <div className="flex h-full w-full flex-col overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-white/10">

            {/* 1. HEADER (Red Full Width) */}
            <header className="shrink-0 bg-[#D90429] p-5 text-center text-white relative flex flex-col items-center justify-center gap-2">
              <div className="flex items-center justify-center gap-2">
                <AlertTriangle className="h-6 w-6 text-white shrink-0" strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase tracking-widest text-white/90">
                  Urgent Consumer Alert:
                </span>
              </div>
              <h2 className="text-2xl font-black uppercase text-[#FFEA00] leading-none tracking-tight drop-shadow-sm">
                2026 Batch Verification
              </h2>
            </header>

            {/* 2. SUB-HEADER (Dark Strip) */}
            <div className="shrink-0 bg-[#0F172A] px-4 py-2 text-center border-b border-gray-800">
              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                <span>Official Product Identity:</span>
                <span className="text-white font-extrabold tracking-wider">Kerassentials™</span>
              </div>
            </div>

            {/* 3. SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-hidden bg-white px-5 py-5">

              {/* Report Box */}
              <div className="mb-5 rounded-lg border border-gray-200 bg-white p-3.5 shadow-sm">
                <div className="mb-2 flex items-center gap-2 border-b border-gray-100 pb-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Forensic Lab Report #992-A
                  </span>
                </div>
                <p className="text-[13px] font-medium leading-relaxed text-gray-800">
                  <span className="text-[#D90429] font-bold">CRITICAL:</span> Counterfeit bottles detected on Amazon & Walmart contain "inert oils" linked to severe chemical burns.
                </p>
              </div>

              <p className="mb-5 text-center text-[13px] font-semibold text-gray-600 leading-snug px-4">
                Secure the Deep-Penetrating Formula directly from the FDA-Registered Facility.
              </p>

              {/* GRID CARDS (Hybrid Layout) */}
              <div className="grid grid-cols-2 gap-4 items-stretch">

                {/* RED CARD (Resellers) */}
                <div className="rounded-lg bg-[#FFF5F5] border border-[#FECACA] p-4 flex flex-col justify-start">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 rounded-full bg-[#FEE2E2] p-2">
                      <Ban className="h-5 w-5 text-[#DC2626]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#991B1B] leading-none">Third-Party Resellers</h3>
                      <p className="text-[11px] font-semibold text-[#B91C1C] mt-1 mb-2">(Amazon / eBay / Walmart)</p>
                      <ul className="text-[11px] text-gray-700 space-y-1.5 font-medium">
                        <li>• Risk of permanent nail bed damage.</li>
                        <li>• <span className="font-bold">NO</span> Refund Validity.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* GREEN CARD (Official) */}
                <div className="relative rounded-lg bg-[#F0FDF4] border-2 border-[#16A34A] p-4 flex flex-col justify-start shadow-sm">

                  {/* Badge */}
                  <div className="absolute top-0 right-0 bg-[#16A34A] text-white text-[9px] font-bold px-2 py-0.5 rounded-bl-lg uppercase tracking-wider">
                    Recommended
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="shrink-0 rounded-full bg-[#DCFCE7] p-2">
                      <ShieldCheck className="h-5 w-5 text-[#16A34A]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-[#14532D] leading-none">Official Manufacturer</h3>
                      <p className="text-[11px] font-semibold text-[#16A34A] mt-1 mb-2">(Direct from Facility)</p>
                      <ul className="text-[11px] text-gray-800 space-y-1.5 font-medium">
                        <li>• <strong>Fresh Batch Guarantee</strong> (Potency check).</li>
                        <li>• 60-Day Money-Back 'Empty Bottle' Guarantee.</li>
                        <li>• Use it all. If it fails, we refund you.*</li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* 4. FOOTER */}
            <footer className="shrink-0 bg-white px-5 pt-3 pb-5 border-t border-gray-100 shadow-[0_-5px_15px_-5px_rgba(0,0,0,0.05)] text-center relative z-30">

              {/* Progress Text */}
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 px-1">
                <span>Verifying Official Batch Authenticity...</span>
                <span className={isVerified ? 'text-[#16A34A]' : 'text-gray-400'}>{progress}% Verified</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-[#16A34A] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              {/* CTA BUTTON */}
              <button
                onClick={onConfirm}
                disabled={!isVerified}
                className={`w-full py-4 rounded-lg flex flex-col items-center justify-center shadow-lg transition-all transform duration-200
                   ${isVerified
                    ? 'bg-[#2F855A] hover:bg-[#276749] hover:scale-[1.02] active:scale-[0.98] shadow-[#2F855A]/30'
                    : 'bg-gray-400 cursor-not-allowed opacity-80'
                  }
                 `}
              >
                {isVerified ? (
                  <>
                    <span className="text-xl font-black uppercase text-white tracking-widest leading-none">Activate Protection</span>
                    <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest mt-1">& Order Securely</span>
                  </>
                ) : (
                  <div className="flex items-center gap-2 text-white/90">
                    <Loader2 className="animate-spin h-5 w-5" />
                    <span className="font-bold uppercase tracking-wider">Please Wait...</span>
                  </div>
                )}
              </button>

              {/* Lock Icons */}
              <div className="mt-4 flex items-center justify-center gap-4 opacity-60">
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-gray-500 tracking-tight">
                  <Lock size={10} />
                  <span>Secure: 256-Bit Encryption</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase text-gray-500 tracking-tight">
                  <CalendarCheck size={10} />
                  <span>Verified: {currentDate}</span>
                </div>
              </div>

              {/* Pulse Dot */}
              <div className="mt-2 flex items-center justify-center gap-1.5">
                <div className={`h-1.5 w-1.5 rounded-full ${isVerified ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                <span className="text-[9px] font-bold uppercase text-green-600 tracking-widest">
                  {isVerified ? 'Online' : 'Connecting...'}
                </span>
                <span className="text-[9px] text-gray-400">|</span>
                <span className="text-[9px] text-gray-400">Applied to Session #8821B</span>
              </div>

              {/* Secondary Link */}
              <button
                onClick={onSecondaryAction}
                className="mt-3 text-[10px] text-gray-400 underline decoration-gray-300 hover:text-gray-600 transition-colors"
              >
                See the chemical burn evidence photos (Read Review)
              </button>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgentModal;