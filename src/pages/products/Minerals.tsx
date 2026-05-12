import { motion } from 'motion/react';
import { Package, CheckCircle2, Globe, Ship, ArrowRight, Pickaxe, TrendingUp, ShieldCheck, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../lib/i18n';

export default function Minerals() {
  const { t } = useTranslation();
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const products = [
    {
      name: t('minerals.gold.title'),
      description: t('minerals.gold.desc'),
      image: "/src/assets/images/regenerated_image_1778505448378.png",
      standards: t('minerals.standards.gold')
    },
    {
      name: t('minerals.tech.title'),
      description: t('minerals.tech.desc'),
      image: "/src/assets/images/regenerated_image_1778504652929.png",
      standards: t('minerals.standards.grade')
    },
    {
      name: t('minerals.gems.title'),
      description: t('minerals.gems.desc'),
      image: "/src/assets/images/regenerated_image_1778504655777.png",
      standards: t('minerals.standards.ethical')
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1516192511155-07202167386d?auto=format&fit=crop&q=80&w=2000" 
            alt="Ethiopian Mineral Mining" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase bg-orange-600 text-white rounded-full">
              {t('hero.tagline')}
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 max-w-4xl mx-auto leading-tight">
              {t('nav.exports')} <br />
              <span className="text-orange-500">{t('home.export.title')}</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              {t('home.capacity.p1')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-lg transition-all shadow-2xl shadow-orange-500/30">
                Secure Supply Chain
              </Link>
              <Link to="/exports" className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-md font-bold text-lg transition-all">
                Export Catalog
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Market Leadership Section */}
      <section id="network" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn}>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">{t('minerals.leadership.tag')}</span>
              <h2 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">{t('minerals.leadership.title')}</h2>
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Moderntech Export & Import PLC has rapidly ascended to become the #1 mineral sourcing and export company in Ethiopia. Our operations bridge the gap between large-scale industrial mining and global buyers requiring consistent, high-purity supply.
                </p>
                <p>
                  We maintain exclusive extraction rights and partnership agreements with the country's most resource-dense regions. Our commitment to ethical mining and rigorous quality control ensures that our minerals meet the highest international industrial standards.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <TrendingUp className="text-orange-600 mb-4" size={32} />
                  <div className="font-bold text-slate-900">{t('export.f.minerals.1')}</div>
                  <div className="text-sm text-slate-500 italic">Consistently leading national mineral export charts.</div>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl border border-orange-100">
                  <ShieldCheck className="text-orange-600 mb-4" size={32} />
                  <div className="font-bold text-slate-900">{t('export.f.minerals.3')}</div>
                  <div className="text-sm text-slate-500 italic">Full transparency and certification on all ores.</div>
                </div>
              </div>
            </motion.div>
            <div className="relative grid grid-cols-2 gap-4 group/grid">
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <img src="/src/assets/images/regenerated_image_1778505215239.png" alt="Mining Extraction" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                  <img src="/src/assets/images/regenerated_image_1778505226563.png" alt="Resource Aggregation" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:translate-y-1">
                  <img src="/src/assets/images/regenerated_image_1778505220555.png" alt="Industrial Facility" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:translate-y-1">
                  <img src="/src/assets/images/regenerated_image_1778505230834.png" alt="Quality Control" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -z-10 group-hover/grid:bg-orange-500/20 transition-colors duration-700"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mineral Portfolio Grid */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">{t('section.stats.minerals')}</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">{t('home.capacity.p1')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.map((item, idx) => (
              <motion.div 
                key={item.name}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:border-orange-200 transition-all"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-slate-900 shadow-sm uppercase tracking-widest">
                    <Package size={14} className="text-orange-500" /> {item.standards}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.name}</h3>
                  <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="space-y-3 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-orange-500" /> {t('export.f.minerals.2')}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-orange-500" /> {t('export.f.minerals.3')}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={18} className="text-orange-500" /> {t('export.f.minerals.4')}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial Capability Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                 <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                    <img src="/src/assets/images/regenerated_image_1778503049133.png" alt="Mining Equipment" className="w-full h-full object-cover" />
                 </div>
                 <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg translate-y-8">
                    <img src="/src/assets/images/regenerated_image_1778503054691.png" alt="Processing Facility" className="w-full h-full object-cover" />
                 </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <h2 className="text-4xl font-bold text-slate-900">{t('minerals.processing.title')}</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                {t('minerals.capability.desc')}
              </p>
              <div className="space-y-6">
                {[
                  { title: t('minerals.capability.1.title'), icon: Globe, desc: t('minerals.capability.1.desc') },
                  { title: t('minerals.capability.2.title'), icon: Pickaxe, desc: t('minerals.capability.2.desc') },
                  { title: t('minerals.capability.3.title'), icon: Ship, desc: t('minerals.capability.3.desc') }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-12 h-12 bg-white text-slate-900 rounded-xl shadow-sm flex items-center justify-center shrink-0">
                      <item.icon size={22} className="text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-950 text-white text-center rounded-t-[4rem] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1582213726893-edc444f0c391?auto=format&fit=crop&q=80&w=2000')] opacity-5 grayscale"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <Gem size={64} className="mx-auto mb-8 text-orange-500" />
          <h2 className="text-4xl font-bold tracking-tight mb-6">{t('hero.cta.minerals')}</h2>
          <p className="text-xl text-slate-300 mb-10 font-light">{t('home.capacity.p2')}</p>
          <Link to="/contact" className="inline-flex items-center gap-3 px-12 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-xl transition-all shadow-2xl shadow-orange-500/40">
            {t('form.send')} <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
