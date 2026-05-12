import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, ArrowRight } from 'lucide-react';
import { useTranslation } from '../lib/i18n';

export default function Footer() {
  const { t, lang } = useTranslation();

  return (
    <footer id="main-footer" className="bg-blue-950 text-white pt-16 pb-8 ltr:text-left rtl:text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-bold tracking-tighter text-white">
                MODERNTECH
              </span>
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-orange-400">
                Export & Import PLC
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer.description')}
            </p>
            <div className={`flex space-x-4 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-orange-500 transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 border-b border-orange-500/30 pb-2 inline-block">
              {t('footer.links')}
            </h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" /> {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/exports" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" /> {t('nav.exports')}
                </Link>
              </li>
              <li>
                <Link to="/imports" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" /> {t('nav.imports')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Group */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-6 border-b border-orange-500/30 pb-2 inline-block">
              {t('footer.group')}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="https://www.moderntechethiopia.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" /> {t('footer.technologies')}
                </a>
              </li>
              <li>
                <span className="text-gray-400 flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" /> {t('footer.manufacturing')}
                </span>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" /> {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 border-b border-orange-500/30 pb-2 inline-block">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 mt-1 shrink-0" size={18} />
                <div className="flex flex-col text-gray-400 text-sm leading-tight">
                  <span className="font-bold text-white mb-1">Africa Avenue, Africa Insurance 3rd floor</span>
                  <span>Addis Ababa, Ethiopia</span>
                  <span className="mt-1">Dubai, UAE</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="text-orange-500 mt-1 shrink-0" size={18} />
                <div className="flex flex-col text-gray-400 text-sm font-mono">
                   <span>+251 911 256838</span>
                   <span>+251 118 2233301</span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-orange-500 shrink-0" size={18} />
                <span className="text-gray-400 text-sm">info@moderntechethiopia.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-blue-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-bold">
          <p>© {new Date().getFullYear()} Moderntech Export & Import PLC. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
