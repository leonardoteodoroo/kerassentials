import React, { useState } from 'react';
import UrgentModal from './components/UrgentModal';

/**
 * App Component
 * Now acts solely as the container for the UrgentModal.
 * The "Background" is handled internally by the UrgentModal's iframe.
 */
export default function App() {
  // Modal open by default to show background immediately
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleConfirm = () => {
    // Logic to redirect to Official Site
    alert("Redirecting to Official Manufacturer Checkout...");
    window.location.href = "https://thekerassentials.com/text.php?aff_id=1119055";
  };

  const handleSecondary = () => {
    // If user clicks secondary, we might want to close modal or redirect.
    // For now, keeping it open or handling as specific logic.
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* 
        The Application Container.
        Since we removed the "Health Insider" dummy content,
        this is just a wrapper for the Modal overlay.
      */}
      <UrgentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        onSecondaryAction={handleSecondary}
      />
    </div>
  );
}