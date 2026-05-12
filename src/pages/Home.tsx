import { motion } from 'motion/react';
import { BadgeCheck, Globe, Coffee, Package, Ship, ArrowRight, TrendingUp, Users, Pickaxe, Zap, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';

export default function Home() {
  const { t, lang } = useTranslation();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const products = [
    {
      title: "Specialty Coffee",
      description: "Direct-from-farm Arabica beans. We own 10+ industrial farms in Oromia while managing Ethiopia's most robust sourcing network to deliver premium Specialty and Commercial grades.",
      image: "/assets/images/regenerated_image_1778502393186.png",
      link: "/exports/coffee"
    },
    {
      title: "Premium Minerals",
      description: "Ethiopia's #1 Mineral powerhouse. We command a dominant supply of high-purity gold, tantalum, and precious gemstones for critical global industries.",
      image: "/assets/images/regenerated_image_1778505448378.png",
      link: "/exports/minerals"
    },
    {
      title: "Pulses & Oilseeds",
      description: "High-protein Haricot beans, Soybeans, and uniform Sesame seeds processed in modern facilities to ensure 99.5% purity and international certification.",
      image: "/assets/images/regenerated_image_1778502399482.png",
      link: "/exports/seeds"
    }
  ];

  const testimonials = [
    {
      name: "Li Wei",
      role: "Logistics Director, Sino-Grain Trade",
      content: t('testimonials.1.content'),
      location: "Shanghai, China",
    },
    {
      name: "Marcus Thompson",
      role: "CEO, Highland Coffee Roasters",
      content: t('testimonials.2.content'),
      location: "Seattle, USA",
    },
    {
      name: "Sarah Jenkins",
      role: "Founder, West Coast Roasters",
      content: t('testimonials.3.content'),
      location: "California, USA",
    },
    {
      name: "Zhang Min",
      role: "Chief Engineer, techMining Solutions",
      content: t('testimonials.4.content'),
      location: "Shanghai, China",
    }
  ];

  return (
    <div id="home-page" className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0 flex">
          <div className="w-1/2 h-full relative overflow-hidden">
            <img 
              src="/assets/images/regenerated_image_1778502393186.png" 
              alt="Premium Ethiopian Specialty Coffee Beans from Oromia Region" 
              className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="w-1/2 h-full relative overflow-hidden">
            <img 
              src="/assets/images/regenerated_image_1778505448378.png" 
              alt="Ethiopian Mineral Resources and Gold Extraction Industry" 
              className="w-full h-full object-cover scale-105 animate-slow-zoom opacity-60"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-blue-950/50 backdrop-blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-transparent to-white/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.3em] uppercase bg-blue-600 text-white rounded-full">
              {t('hero.tagline')}
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
              {t('hero.title.leading')} <span className="text-orange-400">{t('hero.title.products')}</span> <br />
              {t('hero.title.exports')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-4xl mx-auto font-light leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/exports/coffee" 
                className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold transition-all transform hover:-translate-y-1 shadow-lg shadow-orange-500/20 flex items-center gap-2"
              >
                {t('hero.cta.coffee')} <ArrowRight size={18} />
              </Link>
              <Link 
                to="/exports/minerals" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-md font-bold transition-all flex items-center gap-2"
              >
                {t('hero.cta.minerals')} <Pickaxe size={18} />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-1 h-16 rounded-full bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BadgeCheck, title: "Premium Quality", sub: "Globally Certified" },
              { icon: Globe, title: "Global Supply", sub: "Serving 30+ Countries" },
              { icon: Ship, title: "Efficient Logistics", sub: "Seamless Delivery" },
              { icon: TrendingUp, title: "Export Scale", sub: "High Capacity Output" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 bg-blue-50 text-blue-900 rounded-xl group-hover:bg-orange-50 group-hover:text-orange-500 transition-colors">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 text-sm whitespace-nowrap">{item.title}</h4>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="py-20 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/assets/images/regenerated_image_1778505448378.png')] bg-cover bg-center bg-fixed grayscale"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <motion.div {...fadeIn}>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">10+</div>
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-blue-200">{t('section.stats.farms')}</div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.1 }}>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">#1</div>
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-blue-200">{t('section.stats.minerals')}</div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
              <div className="text-5xl md:text-6xl font-bold text-orange-500 mb-2">20k+</div>
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-blue-200">{t('section.stats.capacity')}</div>
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
              <div className="text-5xl md:text-6xl font-bold text-white mb-2">Global</div>
              <div className="text-xs uppercase tracking-[0.3em] font-bold text-blue-200">{t('section.stats.market')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeIn}>
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">{t('home.capacity.tag')}</span>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-8 tracking-tighter leading-tight">
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
              <div className="mt-10">
                <Link to="/about" className="text-blue-900 font-bold flex items-center gap-2 hover:text-orange-500 transition-colors group">
                  {t('home.heritage.link')} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <img 
                  src="/assets/images/regenerated_image_1778502385742.png" 
                  alt="Moderntech Industrial Sourcing and Export Logistics Infrastructure" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-2xl shadow-xl z-20 hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-900">100%</div>
                    <div className="text-xs text-gray-500 uppercase tracking-tighter">Farmer Direct Sourcing</div>
                  </div>
                </div>
                <div className="text-sm text-gray-400">Ensuring fair trade and traceability.</div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-orange-500 rounded-2xl -z-0 opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 tracking-tighter mb-4">{t('section.exports.title')}</h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t('section.exports.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.2 }}
                className="group flex flex-col h-full border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={`Premium Ethiopian ${product.title} Export Grade`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-blue-900 mb-4">{product.title}</h3>
                  <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                    {product.description}
                  </p>
                  <Link 
                    to={product.link}
                    className="mt-auto px-6 py-3 border border-blue-900 text-blue-900 font-semibold rounded-md hover:bg-blue-900 hover:text-white transition-all text-center"
                  >
                    {t('home.product.view')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-blue-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-4 block">{t('testimonials.tag')}</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">{t('testimonials.title')}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testi, idx) => (
              <motion.div 
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10 flex flex-col h-full relative"
              >
                <Quote className="text-orange-500 mb-6 opacity-50" size={40} />
                <p className="text-lg leading-relaxed mb-8 flex-grow italic text-blue-100">"{testi.content}"</p>
                
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-bold text-white text-lg leading-none mb-1">{testi.name}</div>
                    <div className="text-xs text-orange-400 uppercase tracking-widest mb-1">{testi.location}</div>
                    <div className="text-[10px] text-blue-200">{testi.role}</div>
                  </div>
                </div>
                
                <div className="flex gap-1 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-orange-500 text-orange-500" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Group Synergy Section */}
      <section className="py-16 bg-blue-50 border-y border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-2 block">{t('home.synergy.tag')}</span>
              <h2 className="text-3xl font-bold text-blue-900 tracking-tight">{t('home.synergy.title')}</h2>
              <p className="text-gray-500 mt-2">{t('home.synergy.desc')}</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              <a 
                href="https://www.moderntechethiopia.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center group-hover:bg-blue-900 group-hover:text-white transition-colors">
                  <Zap size={20} />
                </div>
                <div>
                   <div className="text-sm font-bold text-blue-900">Moderntech Technologies</div>
                   <div className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Telecom & IT Solutions</div>
                </div>
              </a>
              <div className="bg-white px-6 py-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-lg flex items-center justify-center">
                  <Package size={20} />
                </div>
                <div>
                   <div className="text-sm font-bold text-blue-900">Moderntech Manufacturing</div>
                   <div className="text-[10px] text-gray-400 uppercase tracking-widest leading-none">Water & Industrial Production</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/10 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 max-w-3xl mx-auto">
            {t('home.cta.title')}
          </h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            {t('home.cta.subtitle')}
          </p>
          <Link 
            to="/contact" 
            className="px-10 py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-bold text-lg transition-all shadow-xl shadow-orange-500/20 inline-flex items-center gap-3"
          >
            {t('home.cta.button')} <Ship size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}
