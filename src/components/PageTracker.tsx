import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * GTM Page Tracker
 * Listens for route changes and pushes 'pageview' events to the GTM dataLayer.
 * Essential for SPA (Single Page Application) tracking consistency.
 */
const PageTracker = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if dataLayer exists (it should, from index.html)
        const dataLayer = (window as any).dataLayer || [];

        // Push the event
        dataLayer.push({
            event: 'page_view',
            page_path: location.pathname + location.hash, // Include hash for HashRouter clarity
            page_title: document.title,
        });

    }, [location]);

    return null;
};

export default PageTracker;
