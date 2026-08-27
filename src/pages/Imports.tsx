import { motion } from 'motion/react';
import { Truck, Zap, Droplets, Settings, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';
import CMSImage from '../components/CMSImage';

export default function Imports() {
  const { t } = useTranslation();
  const importItems = [
    { name: t('imports.cat.vehicles'), icon: Truck, desc: t('imports.cat.vehicles.desc') },
    { name: t('imports.cat.machinery'), icon: Settings, desc: t('imports.cat.machinery.desc') },
    { name: t('imports.cat.parts'), icon: Zap, desc: t('imports.cat.parts.desc') },
    { name: t('imports.cat.materials'), icon: Droplets, desc: t('imports.cat.materials.desc') }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative py-32 bg-blue-950 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <CMSImage 
            imageKey="imports_hero_bg"
            fallback="/assets/images/regenerated_image_1778502385742.png"
            alt="International Logistics"
            className="w-full h-full object-cover opacity-20 pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('hero.tagline')}</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              {t('nav.imports')} <br />
              <span className="text-orange-400 italic">{t('imports.hero.infrastructure')}</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-xl leading-relaxed font-light">
              {t('home.capacity.p1')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Import Grid */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {importItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white border border-gray-100 rounded-3xl group hover:shadow-xl hover:border-orange-100 transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <item.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-blue-900 mb-2">{item.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimalistic CTA */}
      <section className="py-24 bg-white text-center border-t border-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gray-600 mb-8 italic">
            "{t('imports.cta.quote')}"
          </p>
          <Link to="/contact" className="text-blue-900 font-bold flex items-center justify-center gap-2 hover:text-orange-500 transition-colors uppercase tracking-widest text-sm">
            {t('imports.cta.partnership')} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
