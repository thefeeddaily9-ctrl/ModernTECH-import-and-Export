import { motion } from 'motion/react';
import { Coffee as CoffeeIcon, MapPin, BadgeCheck, Zap, Ship, ArrowRight, Star, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../lib/i18n';

export default function Coffee() {
  const { t } = useTranslation();
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  const regions = [
    { name: "Yirgacheffe (Oromia)", profile: "Citrusy, floral, and light-bodied. Sourced from our primary farm clusters." },
    { name: "Sidamo (Oromia)", profile: "Deep fruity notes with a rich aroma. Controlled organic cultivation." },
    { name: "GuJi (Oromia)", profile: "Complex flavors with hints of jasmine. High altitude premium sourcing." },
    { name: "Jimma & Kaffa", profile: "The birthplace. Bold, winey, and spicy. Heritage forest coffee." }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Premium Hero */}
      <section className="relative h-[90vh] flex items-center justify-start text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1447933601403-0c668b7556ed?q=80&w=2070&auto=format&fit=crop" 
            alt="Ethiopian Coffee Highlands" 
            className="w-full h-full object-cover scale-105 animate-slow-zoom"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-blue-950/60 backdrop-blur-[1px]"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase bg-orange-500 text-white rounded-full">
              <Star size={14} className="fill-white" /> {t('hero.tagline')}
            </div>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.85]">
              {t('hero.cta.coffee')} <br />
              <span className="text-orange-500">{t('coffee.hero.authority')}</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-10 font-light leading-relaxed">
              {t('home.capacity.p1')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/contact" 
                className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold transition-all shadow-2xl shadow-orange-500/30 text-center"
              >
                {t('coffee.cta.bulk')}
              </Link>
              <a 
                href="#network" 
                className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-md font-bold transition-all text-center"
              >
                {t('coffee.cta.network')}
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Floating Stats */}
        <div className="absolute bottom-0 right-0 p-12 hidden lg:block">
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] grid grid-cols-2 gap-12">
            <div>
              <div className="text-4xl font-bold text-orange-400">10+</div>
              <div className="text-[10px] uppercase tracking-widest font-bold">{t('coffee.stat.owned')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400">#1</div>
              <div className="text-[10px] uppercase tracking-widest font-bold">{t('coffee.stat.market')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sourcing & Production Section */}
      <section id="network" className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn}>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">{t('home.capacity.tag')}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 tracking-tight leading-tight">
                {t('home.capacity.title')}
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  {t('home.capacity.p1')}
                </p>
                <p>
                  {t('home.capacity.p2')}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                <div className="p-6 bg-blue-50 rounded-2xl flex items-center gap-4">
                  <ShieldCheck className="text-blue-900" size={32} />
                  <div>
                    <div className="font-bold text-blue-900">Total Quality Control</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">From Seed to Export</div>
                  </div>
                </div>
                <div className="p-6 bg-orange-50 rounded-2xl flex items-center gap-4">
                  <Globe className="text-orange-600" size={32} />
                  <div>
                    <div className="font-bold text-blue-900">Global Reach</div>
                    <div className="text-xs text-gray-400 uppercase font-bold tracking-tighter">Djibouti-to-World Express</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="relative group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/assets/images/regenerated_image_1778504163293.png" 
                  alt="Aerial View of Moderntech Coffee Farms" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-0"></div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                 <div className="p-3 bg-blue-900 text-white rounded-xl">
                    <MapPin size={24} />
                 </div>
                 <div>
                    <div className="text-sm font-bold text-blue-900 uppercase tracking-tighter">Cluster Leader</div>
                    <div className="text-xs text-gray-500">Central Oromia Operations</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farm Grid / Stats */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">{t('section.stats.farms')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('home.capacity.p1')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regions.map((region, idx) => (
              <motion.div 
                key={region.name}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:border-orange-200 transition-all"
              >
                <div className="font-bold text-blue-900 text-lg mb-2">{region.name}</div>
                <p className="text-sm text-gray-500 leading-relaxed italic">"{region.profile}"</p>
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2">
                   <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                   <span className="text-[10px] font-bold uppercase text-gray-400">{t('coffee.region.moderntech')}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Process */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col lg:flex-row gap-16 items-start">
             <div className="lg:w-1/2">
                <h2 className="text-4xl font-bold text-blue-900 mb-8">{t('coffee.quality.title')}</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-10">
                  As a leading PLC, we have invested heavily in our washing stations and hulling facilities. Our coffee undergoes a 5-step quality verification process, including laser sorting and professional cupping by certified Q-graders.
                </p>
                
                <div className="space-y-8">
                  {[
                    { title: "Washing & Fermentation", icon: Zap, desc: "State-of-the-art wet mills in Oromia ensuring clean parchment." },
                    { title: "Drying & Grading", icon: BadgeCheck, desc: "Sundried on raised beds under strict temporal and moisture control." },
                    { title: "Export Logistics", icon: Ship, desc: "Dedicated container pipeline ensuring freshness from Addis to global hubs." }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6">
                       <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                          <step.icon size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-blue-900 text-xl">{step.title}</h4>
                          <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl translate-y-8">
                   <img src="/assets/images/regenerated_image_1778504167950.png" alt="Processing" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                   <img src="/assets/images/regenerated_image_1778504171098.png" alt="Hulling" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
             </div>
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-5xl font-bold tracking-tight mb-8">{t('hero.cta.coffee')}</h2>
            <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
               {t('home.capacity.p2')}
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-12 py-6 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-xl transition-all shadow-2xl shadow-orange-500/40">
               {t('form.send')} <ArrowRight size={24} />
            </Link>
        </div>
      </section>
    </div>
  );
}
