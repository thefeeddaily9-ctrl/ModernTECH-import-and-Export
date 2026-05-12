import { motion } from 'motion/react';
import { Coffee, ArrowRight, ShieldCheck, Globe, Zap, History, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

export default function About() {
  const { t } = useTranslation();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="py-16 bg-blue-950 text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000')] bg-fixed opacity-10 grayscale"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t('nav.about')}</h1>
            <p className="text-xl text-blue-200 font-light max-w-2xl">
              {t('about.hero.title')}
            </p>
            <div className="mt-8 h-1 w-24 bg-orange-500"></div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <motion.div {...fadeIn}>
              <h2 className="text-3xl font-bold text-blue-900 mb-8 tracking-tight">{t('home.capacity.title')}</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  {t('home.capacity.p1')}
                </p>
                <p>
                  {t('home.capacity.p2')}
                </p>
                <div className="p-6 bg-blue-50 border-l-4 border-orange-500 rounded-r-xl mt-8">
                  <p className="text-blue-900 font-medium italic">
                    "{t('about.vision.content')}"
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img src="/assets/images/regenerated_image_1778504163293.png" alt="Coffee farming" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img src="/assets/images/regenerated_image_1778502385742.png" alt="Logistics" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img src="/assets/images/regenerated_image_1778502399482.png" alt="Seeds" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <img src="/assets/images/regenerated_image_1778504171098.png" alt="Coffee beans" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Moderntech Enterprises (Parent Group) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2 block">{t('home.synergy.tag')}</span>
            <h2 className="text-4xl font-bold text-blue-900 tracking-tighter">{t('home.synergy.title')}</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">{t('home.synergy.desc')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              {...fadeIn}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <Zap size={28} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center justify-between">
                {t('footer.technologies')}
                <a href="https://www.moderntechethiopia.com/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1">
                  Visit Site <ArrowRight size={14} />
                </a>
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Recognized as a leading telecom sales pipeline provider in Africa. Empowering businesses through advanced technological infrastructure and connectivity solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-500 font-medium whitespace-nowrap overflow-hidden">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Telecom Infrastructure
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Sales Pipeline Solutions
                </li>
              </ul>
            </motion.div>

            <motion.div 
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl transition-all"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-900 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                <Package size={28} />
              </div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">{t('footer.manufacturing')}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our heavy-industry division focused on domestic production. We are proud manufacturers of high-quality bottled water and other essential industrial products.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Water Bottling & Manufacturing
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div> Industrial Capacity
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div {...fadeIn} className="bg-blue-950 p-12 rounded-[2rem] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Globe size={160} />
              </div>
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="h-10 w-1 bg-orange-500"></div> Our Mission
              </h3>
              <p className="text-xl text-blue-100 font-light leading-relaxed">
                To be the most reliable link between Ethiopian agricultural excellence and global industry needs, delivering quality through innovation and integrity.
              </p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="bg-orange-50 p-12 rounded-[2rem] text-blue-900 overflow-hidden relative border border-orange-100">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <ShieldCheck size={160} />
              </div>
              <h3 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <div className="h-10 w-1 bg-orange-500"></div> Our Vision
              </h3>
              <p className="text-xl text-blue-900/80 font-light leading-relaxed mb-6">
                {t('about.vision.title')}
              </p>
              <div className="pt-6 border-t border-orange-200">
                <p className="font-bold text-lg text-blue-900">{t('about.ceo.name')}</p>
                <p className="text-sm text-orange-600 uppercase tracking-widest font-bold">{t('about.ceo.role')}</p>
                <p className="mt-4 text-gray-600 italic">"{t('about.vision.content')}"</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 tracking-tight">The Moderntech Advantage</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Globe, title: t('nav.exports'), desc: "Decades of combined experience in handling complex international trade regulations and logistics." },
              { icon: History, title: t('about.hero.title'), desc: "Pure Ethiopian origin products with full traceability from farm to your destination." },
              { icon: ShieldCheck, title: t('hero.tagline'), desc: "Backed by the multi-PLC strength of Moderntech Enterprises group." },
            ].map((item, idx) => (
              <motion.div key={idx} {...fadeIn} transition={{ delay: idx * 0.1 }} className="space-y-4">
                <div className="w-16 h-16 bg-white border border-gray-100 shadow-sm rounded-2xl flex items-center justify-center mx-auto text-orange-500">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-bold text-blue-900">{item.title}</h4>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
