import React, { useState, Suspense, lazy } from 'react';
import UrgentModal from './components/UrgentModal';

const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));

/**
 * App Component
 * Now acts solely as the container for the UrgentModal.
 * The "Background" is handled internally by the UrgentModal's iframe.
 */
export default function App() {
  // Modal open by default to show background immediately
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [showExitPopup, setShowExitPopup] = useState(false);

  const handleConfirm = () => {
    // Redirect to Official Site
    window.location.href = "https://thekerassentials.com/text.php?aff_id=1119055";
  };

  const handleSecondary = () => {
    setIsModalOpen(false);
  };

  const handleDismiss = () => {
    // When user tries to close the main modal via X or CLOSE,
    // we close it and trigger the exit popup.
    setIsModalOpen(false);
    setShowExitPopup(true);
  };

  const handleExitPopupClose = () => {
    // If the exit popup is closed, we bring back the urgent modal
    setShowExitPopup(false);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* 
        PERSISTENT BACKGROUND
        - Moved here so it stays visible when modals are swapped
      */}
      <picture className="fixed inset-0 h-[100dvh] w-full z-0 pointer-events-none">
        <source
          media="(max-width: 767px)"
          srcSet="/background-hero-mobile.webp"
          width="500"
          height="757"
        />
        <img
          src="/background-hero.webp"
          className="h-full w-full object-cover object-top"
          alt="Official Kerassentials Website Background showing product bottles"
          width="1680"
          height="1050"
          fetchPriority="high"
        />
      </picture>

      <UrgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        onSecondaryAction={handleSecondary}
        onDismiss={handleDismiss}
      />
      <Suspense fallback={null}>
        <ExitIntentPopup
          triggerOpen={showExitPopup}
          onClose={handleExitPopupClose}
        />
      </Suspense>
    </div>
  );
}