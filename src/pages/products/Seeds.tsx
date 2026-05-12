import { motion } from 'motion/react';
import { Package, CheckCircle2, TrendingUp, Ship, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../lib/i18n';

export default function Seeds() {
  const { t } = useTranslation();
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const seedTypes = [
    {
      name: t('seeds.sesame.title'),
      description: t('seeds.sesame.desc'),
      benefits: ["99% Purity Level", "Machine Cleaned", "Premium Oil Content"]
    },
    {
      name: t('seeds.soy.title'),
      description: t('seeds.soy.desc'),
      benefits: ["Non-GMO", "High Protein", "Strict Quality Grading"]
    },
    {
      name: t('seeds.niger.title'),
      description: t('seeds.niger.desc'),
      benefits: ["Consistent Supply", "Well-Sorted", "Sustainable Sourcing"]
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-orange-500/10 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-400 font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{t('hero.tagline')}</span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto">
              {t('hero.cta.seeds')} <span className="text-orange-500">{t('nav.exports')}</span>
            </h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home.capacity.p1')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-bold text-blue-900 mb-8 tracking-tight">{t('seeds.purity.title')}</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {t('seeds.purity.desc')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl border border-orange-100">
                  <CheckCircle2 className="text-orange-500 shrink-0" size={24} />
                  <div>
                    <div className="font-bold text-blue-900">99% Purity Levels</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Industry Leading Standards</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <TrendingUp className="text-blue-900 shrink-0" size={24} />
                  <div>
                    <div className="font-bold text-blue-900">High Yield Capacity</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Reliable Bulk Export</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl h-[500px]"
            >
              <img src="/assets/images/regenerated_image_1778502399482.png" alt="Sesame Seeds" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seedTypes.map((seed, idx) => (
              <motion.div 
                key={seed.name}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-10 border border-gray-100 rounded-[2rem] hover:border-orange-200 hover:shadow-xl transition-all shadow-sm"
              >
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{seed.name}</h3>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                  {seed.description}
                </p>
                <div className="space-y-3">
                  {seed.benefits.map(b => (
                    <div key={b} className="flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-blue-900">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div> {b}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <Ship size={64} className="mx-auto mb-8 text-blue-900" />
            <h2 className="text-3xl font-bold text-blue-900 mb-6">{t('hero.cta.beans')}</h2>
            <p className="text-gray-600 leading-relaxed mb-10">
              {t('home.capacity.p2')}
            </p>
            <Link to="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold transition-all shadow-lg shadow-orange-500/20">
              {t('form.send')} <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
