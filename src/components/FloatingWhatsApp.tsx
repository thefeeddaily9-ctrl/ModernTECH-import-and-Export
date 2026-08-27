import { MessageCircle } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export default function FloatingWhatsApp() {
  const { t } = useTranslation();

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      "Hello Moderntech Export Desk, I am interested in inquiring about Ethiopian Green Coffee & export commodities."
    );
    window.open(`https://wa.me/251931573392?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      <div className="hidden md:flex items-center mr-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        {t('whatsapp.chat') || "Chat on WhatsApp"}
      </div>
      <button
        onClick={handleWhatsApp}
        aria-label="Contact via WhatsApp"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/30"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
