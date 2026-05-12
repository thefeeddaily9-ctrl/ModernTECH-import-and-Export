import { motion } from 'motion/react';
import { Package, CheckCircle2, Globe, Ship, ArrowRight, Salad, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../lib/i18n';

export default function Beans() {
  const { t } = useTranslation();
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const products = [
    {
      name: t('beans.pea.title'),
      description: t('beans.pea.desc'),
      image: "/src/assets/images/regenerated_image_1778502399482.png"
    },
    {
      name: t('beans.soy.premium.title'),
      description: t('beans.soy.premium.desc'),
      image: "/src/assets/images/regenerated_image_1778504163293.png"
    },
    {
      name: t('beans.vetch.title'),
      description: t('beans.vetch.desc'),
      image: "/src/assets/images/regenerated_image_1778504171098.png"
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('hero.tagline')}</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-tight">
              {t('hero.cta.beans')} <span className="text-orange-500">{t('nav.exports')}</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home.capacity.p1')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Categories Row */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((item, idx) => (
              <motion.div 
                key={item.name}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all"
              >
                <div className="aspect-square overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent"></div>
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-blue-900 shadow-sm uppercase tracking-widest leading-none pt-[1px]">
                    <Salad size={14} className="text-orange-500" /> Premium Pulse
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">{item.name}</h3>
                  <p className="text-gray-500 mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-orange-500" /> Non-GMO Certified
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-orange-500" /> SGS Quality Tested
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <h2 className="text-4xl font-bold text-blue-900 mb-8 tracking-tight">{t('beans.guarantee.title')}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  {t('beans.guarantee.desc')}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
                    <div className="text-orange-500 font-bold mb-1">Machine Cleaned</div>
                    <div className="text-sm">Removing all impurities through modern filtration.</div>
                  </div>
                  <div className="p-6 bg-white rounded-2xl shadow-sm border border-orange-100">
                    <div className="text-orange-500 font-bold mb-1">Hand Picked</div>
                    <div className="text-sm">Ensuring aesthetic and quality consistency.</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-12 bg-blue-900 rounded-[3rem] text-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe size={160} />
              </div>
              <h3 className="text-2xl font-bold mb-6">{t('beans.logistics.title')}</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <Ship className="text-orange-400 shrink-0" size={24} />
                  <div>
                    <div className="font-bold text-lg">{t('beans.logistics.bulk')}</div>
                    <p className="text-blue-100/70 text-sm">{t('beans.logistics.bulk.desc')}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Package className="text-orange-400 shrink-0" size={24} />
                  <div>
                    <div className="font-bold text-lg">{t('beans.logistics.secure')}</div>
                    <p className="text-blue-100/70 text-sm">{t('beans.logistics.secure.desc')}</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">{t('hero.cta.beans')}</h2>
          <p className="text-gray-500 mb-10 leading-relaxed text-lg">{t('home.capacity.p2')}</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-lg transition-all shadow-xl shadow-orange-500/20">
            {t('form.send')} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
