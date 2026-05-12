import { motion } from 'motion/react';
import { Coffee, Package, Ship, ArrowRight, CheckCircle2, Globe, Pickaxe, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

export default function Exports() {
  const { t } = useTranslation();
  const categories = [
    {
      id: "coffee",
      title: t('hero.cta.coffee'),
      tagline: t('hero.tagline'),
      description: t('home.capacity.p1'),
      image: "/src/assets/images/regenerated_image_1778502393186.png",
      link: "/exports/coffee",
      features: [t('export.f.coffee.1'), t('export.f.coffee.2'), t('export.f.coffee.3'), t('export.f.coffee.4')]
    },
    {
      id: "minerals",
      title: t('hero.cta.minerals'),
      tagline: t('hero.tagline'),
      description: t('home.capacity.p2'),
      image: "/src/assets/images/regenerated_image_1778505448378.png",
      link: "/exports/minerals",
      features: [t('export.f.minerals.1'), t('export.f.minerals.2'), t('export.f.minerals.3'), t('export.f.minerals.4')]
    },
    {
      id: "seeds",
      title: t('hero.cta.seeds'),
      tagline: t('hero.tagline'),
      description: t('home.capacity.p1'),
      image: "/src/assets/images/regenerated_image_1778504163293.png",
      link: "/exports/seeds",
      features: ["SGS Certified Quality", "Modern Sorting Technology", "Bulk Supply Capacity", "Organic Grade Available"]
    },
    {
      id: "beans",
      title: t('hero.cta.beans'),
      tagline: t('hero.tagline'),
      description: t('home.capacity.p2'),
      image: "/src/assets/images/regenerated_image_1778502399482.png",
      link: "/exports/beans",
      features: ["99.5% Machine Cleaned", "Non-GMO Certified", "Industrial Scale Supply", "Traceable Harvesting"]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/10 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('hero.tagline')}</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-tight">
              {t('nav.exports')} <span className="text-orange-500 italic font-medium">Ethiopia</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Categories */}
      <section className="py-24 space-y-32">
        {categories.map((cat, idx) => (
          <div key={cat.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}
              >
                <span className="text-orange-500 font-bold uppercase tracking-widest text-sm block">{cat.tagline}</span>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-900 tracking-tight leading-tight">
                  {cat.title}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {cat.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 pt-4">
                  {cat.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={18} className="text-orange-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="pt-8">
                  <Link 
                    to={cat.link} 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-blue-900 text-white rounded-md font-bold transition-all hover:bg-blue-800 hover:gap-5 shadow-lg shadow-blue-900/20"
                  >
                    {t('home.product.view')} <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}
              >
                <div className="relative group">
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                    <img src={cat.image} alt={cat.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 p-6 bg-white rounded-2xl shadow-xl hidden md:flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
                      {cat.id === 'coffee' ? <Coffee size={24} /> : (cat.id === 'minerals' ? <Pickaxe size={24} /> : <Package size={24} />)}
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">{t('export.v.category')}</div>
                      <div className="text-blue-900 font-bold">{cat.id === 'pulses' ? 'Pulses' : (cat.id.charAt(0).toUpperCase() + cat.id.slice(1))} {t('export.v.export')}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </section>

      {/* Global Capability */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">{t('home.capacity.title')}</h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              {t('home.capacity.p2')}
            </p>
            <div className="flex flex-wrap justify-center gap-8 opacity-40">
              <Ship size={60} />
              <Globe size={60} />
              <Package size={60} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
