import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe, Coffee, Package, Ship, Phone, Pickaxe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from '../lib/i18n';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { 
      name: t('nav.exports'), 
      href: '/exports',
      dropdown: [
        { name: t('nav.coffee'), href: '/exports/coffee', icon: Coffee },
        { name: t('nav.minerals'), href: '/exports/minerals', icon: Pickaxe },
        { name: t('nav.seeds'), href: '/exports/seeds', icon: Package },
        { name: t('nav.beans'), href: '/exports/beans', icon: Package },
      ]
    },
    { name: t('nav.imports'), href: '/imports' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ar', name: 'العربية' },
  ];

  const currentLangName = languages.find(l => l.code === lang)?.name || 'English';

  return (
    <nav 
      id="main-nav"
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3 ltr:left-0 rtl:right-0' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ltr:text-left rtl:text-right">
        <div className="flex justify-between items-center ltr:flex-row rtl:flex-row-reverse">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col">
              <span className={`text-2xl font-bold tracking-tighter ${isScrolled || location.pathname !== '/' ? 'text-blue-900' : 'text-white'}`}>
                MODERNTECH
              </span>
              <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${isScrolled || location.pathname !== '/' ? 'text-orange-500' : 'text-orange-400'}`}>
                Export & Import PLC
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className={`ml-10 flex items-baseline space-x-4 lg:space-x-8 ${lang === 'ar' ? 'space-x-reverse' : ''}`}>
              {navLinks.map((link) => (
                <div key={link.name} className="relative group">
                  <Link
                    to={link.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-orange-500 flex items-center gap-1 ${
                      isScrolled || location.pathname !== '/' ? 'text-blue-900' : 'text-white'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={14} />}
                  </Link>
                  
                  {link.dropdown && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left ltr:left-0 rtl:right-0">
                      <div className="py-1">
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-900 flex items-center gap-2"
                          >
                            <item.icon size={16} className="text-orange-500" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                  onBlur={() => setTimeout(() => setLangDropdownOpen(false), 200)}
                  className={`px-3 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition-all ${
                    isScrolled || location.pathname !== '/' ? 'text-blue-900' : 'text-white'
                  } border border-transparent hover:border-orange-500/30`}
                >
                  <Globe size={16} className="text-orange-500" />
                  {currentLangName}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${langDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {langDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-40 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-[60] ltr:right-0 rtl:left-0"
                    >
                      <div className="py-1">
                        {languages.map((l) => (
                          <button
                            key={l.code}
                            onClick={() => {
                              setLang(l.code as any);
                              setLangDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between transition-colors ${
                              lang === l.code ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-700 hover:bg-gray-50'
                            } ${l.code === 'ar' ? 'flex-row-reverse' : ''}`}
                          >
                            {l.name}
                            {lang === l.code && <div className="w-2 h-2 bg-orange-500 rounded-full"></div>}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <div className="md:hidden">
               <button 
                onClick={() => {
                  const nextLang = lang === 'en' ? 'zh' : (lang === 'zh' ? 'ar' : (lang === 'ar' ? 'de' : 'en'));
                  setLang(nextLang as any);
                }}
                className={`p-2 rounded-md ${isScrolled || location.pathname !== '/' ? 'text-blue-900' : 'text-white flex items-center gap-1 text-xs font-bold'}`}
               >
                 <Globe size={18} /> {lang.toUpperCase()}
               </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled || location.pathname !== '/' ? 'text-blue-900' : 'text-white'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-900 hover:text-orange-500 hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 space-y-1">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-900 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <item.icon size={14} className="text-orange-500" />
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
