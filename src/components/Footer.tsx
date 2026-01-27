import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Reusable Accordion Section Component
const FooterSection: React.FC<{
    title: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}> = ({ title, children, isOpen, onToggle }) => (
    <div className="border-b border-gray-200 last:border-0">
        <button
            onClick={onToggle}
            aria-expanded={isOpen}
            className="w-full flex items-center justify-between py-5 text-left group bg-gray-50 hover:bg-gray-100 transition-colors px-2 rounded min-h-[48px]"
        >
            <span className="text-gray-800 font-bold uppercase tracking-wider text-[11px] group-hover:text-blue-700">
                {title}
            </span>
            {isOpen ? <ChevronUp size={14} className="text-gray-500" aria-hidden="true" /> : <ChevronDown size={14} className="text-gray-500" aria-hidden="true" />}
        </button>
        <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
            <div className="pb-4 pt-1 text-[11px] leading-relaxed text-gray-700 px-2">
                {children}
            </div>
        </div>
    </div>
);

const Footer: React.FC = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200 font-sans pb-8 mt-4">
            <div className="max-w-4xl mx-auto px-4">

                {/* 1. CONTACT INFORMATION */}
                <FooterSection
                    title="1. Contact Information"
                    isOpen={openSection === 'contact'}
                    onToggle={() => toggleSection('contact')}
                >
                    <div className="flex flex-col gap-2">
                        <p className="font-semibold text-gray-800">Sempre na Moda</p>
                        <p>Tax ID: 41.024.752/0001-70</p>
                        <p>
                            Email: <a href="mailto:sac@semprenamoda.com.br" className="text-blue-600 hover:underline">sac@semprenamoda.com.br</a>
                        </p>

                        <p>Business Hours: Mon-Fri 09:00 - 20:00 (BRT).</p>
                    </div>
                </FooterSection>

                {/* 2. MEDICAL DISCLAIMER */}
                <FooterSection
                    title="2. Medical Disclaimer (FDA Compliance)"
                    isOpen={openSection === 'medical'}
                    onToggle={() => toggleSection('medical')}
                >
                    <p className="mb-2">
                        The information provided on this website is for educational purposes only and is not intended as medical advice.
                        Statements regarding Kerassentials have not been evaluated by the Food and Drug Administration (FDA).
                    </p>
                    <p>
                        As per FDA regulations, while the manufacturing facilities are <span className="font-semibold">FDA Registered</span> and <span className="font-semibold">GMP Certified</span> (Good Manufacturing Practices), the product itself is classified as a cosmetic/topical oil and is not 'FDA Approved' to diagnose, treat, cure, or prevent any disease.
                    </p>
                    <p className="mt-2 text-[10px] text-gray-500 italic">
                        [Source: <a href="https://www.fda.gov/cosmetics" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">FDA Authority Over Cosmetics</a>]
                    </p>
                    <p className="mt-2">
                        Individual results may vary. Scientific studies on primary ingredients such as Tea Tree Oil (<a href="https://pubmed.ncbi.nlm.nih.gov/8195735/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">PubMed 8195735</a>) and Clove Oil (<a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3763181/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">PMC 3763181</a>) demonstrate antifungal potential, but they do not guarantee identical outcomes for all users. Always consult a qualified healthcare professional before beginning any new treatment.
                    </p>
                </FooterSection>

                {/* 3. CONSUMER PROTECTION & SECURITY WARNING */}
                <FooterSection
                    title="3. Consumer Protection & Security Warning"
                    isOpen={openSection === 'consumer'}
                    onToggle={() => toggleSection('consumer')}
                >
                    <div className="bg-red-50 border border-red-100 p-2 rounded mb-2">
                        <strong className="text-red-700">IMPORTANT SECURITY ALERT:</strong> According to recent market intelligence reports [Source: Morningstar], Kerassentials is <strong className="text-red-700">NOT</strong> officially sold on Amazon, Walmart, or eBay. Listings found on these marketplaces are frequently cited as 'diluted or counterfeit' and are sold by unauthorized third parties using retail arbitrage.
                    </div>
                    <p>
                        Purchasing from these unauthorized channels voids your eligibility for the <span className="font-semibold">60-Day Money-Back Guarantee</span>. To ensure you receive the authentic 8-in-1 formula, only order through the <a href="https://thekerassentials.com/text.php?aff_id=1119055" rel="sponsored" className="text-blue-600 font-bold hover:underline">Authorized Batch links</a> provided on this site, which are processed securely via ClickBank or BuyGoods.
                    </p>
                    <p className="mt-2">
                        If you experience issues with refunds, we recommend contacting the payment processor directly as per <a href="https://www.bbb.org/" target="_blank" rel="nofollow noopener noreferrer" className="text-blue-600 hover:underline">BBB consumer guidelines</a>.
                    </p>
                </FooterSection>

                {/* 4. FTC AFFILIATE DISCLOSURE */}
                <FooterSection
                    title="4. FTC Affiliate Disclosure & Special Offer"
                    isOpen={openSection === 'ftc'}
                    onToggle={() => toggleSection('ftc')}
                >
                    <p className="mb-2">
                        <strong className="text-gray-700">Affiliate Disclosure:</strong> This website is a professional review and analysis portal. We receive compensation from companies whose products we review. This support allows us to maintain our forensic research operations to protect consumers from marketplace fraud.
                    </p>
                    <p>
                        Through our partnership, we are currently able to offer a <span className="font-bold text-green-600">72.63% discount</span> on authorized batches of Kerassentials—a strategic pricing move by the manufacturer to divert customers away from dangerous counterfeit listings in the 'red ocean' of unauthorized sellers. Pricing and availability are subject to change.
                    </p>
                </FooterSection>

                {/* 5. PRIVACY POLICY & TERMS OF USE */}
                <FooterSection
                    title="5. Privacy Policy & Terms of Use"
                    isOpen={openSection === 'privacy'}
                    onToggle={() => toggleSection('privacy')}
                >
                    <p className="mb-2">
                        <strong className="text-gray-700">Sempre na Moda (CNPJ: 41.024.752/0001-70)</strong> is committed to your privacy. We collect minimal browsing data to optimize our advertising performance. We do not sell or rent your personal information.
                    </p>
                    <p>
                        By using this site, you agree to our Terms of Use, which include the understanding that we provide strategic information 'as is' and are not liable for outcomes based on the use of third-party products.
                    </p>
                </FooterSection>

                {/* 6. SCIENTIFIC SUBSTANTIATION */}
                <FooterSection
                    title="6. Scientific Substantiation (References)"
                    isOpen={openSection === 'science'}
                    onToggle={() => toggleSection('science')}
                >
                    <p className="mb-2 font-semibold text-gray-700">Scientific References & Authority Sources:</p>
                    <ul className="list-disc pl-4 space-y-1 text-blue-600">
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/8195735/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Antifungal Efficacy (Tea Tree Oil): PubMed ID 8195735
                            </a>
                        </li>
                        <li>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3763181/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Dermatophyte Inhibition (Clove Oil): PMC 3763181
                            </a>
                        </li>
                        <li>
                            <a href="https://pubmed.ncbi.nlm.nih.gov/16178366/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Hyphal Growth Inhibition (Lavender Oil): PubMed 16178366
                            </a>
                        </li>
                        <li>
                            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7730074/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Nail Plate Penetration Research: PMC 7730074
                            </a>
                        </li>
                        <li>
                            <a href="https://www.morningstar.com/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Marketplace Fraud Analysis: Morningstar/Accesswire News 1117487
                            </a>
                        </li>
                        <li>
                            <a href="https://www.bbb.org/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Consumer Complaint Registry: Better Business Bureau (BBB) Aurora Profile
                            </a>
                        </li>
                        <li className="pt-2 border-t border-gray-200 mt-2">
                            <strong className="text-gray-500 block text-[10px] mb-1">Additional Authority & Validator Sources (2026 Compliance):</strong>
                        </li>
                        <li>
                            <a href="https://www.fda.gov/cosmetics/cosmetics-laws-regulations/fda-authority-over-cosmetics-how-cosmetics-are-not-fda-approved" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                FDA Authority: Cosmetics vs. Drug Approval (Clarification)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.truemed.com/" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                TrueMed: Counterfeit Drug & Supplement Report (2025-2026)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.bbb.org/us/de/wilmington/profile/online-retailer/buygoods-0251-00000000" target="_blank" rel="nofollow noopener noreferrer" className="hover:underline">
                                Payment Processor Integrity: BuyGoods BBB Profile
                            </a>
                        </li>
                    </ul>
                </FooterSection>

            </div>

            <div className="text-center w-full mt-6 pt-6 border-t border-gray-200 px-4">
                <p className="text-[10px] text-gray-500">
                    &copy; {new Date().getFullYear()} Sempre na Moda. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
