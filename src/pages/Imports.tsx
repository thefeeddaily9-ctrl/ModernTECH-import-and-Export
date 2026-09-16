import { motion } from 'motion/react';
import { Truck, Zap, Droplets, Settings, ArrowRight, ShieldCheck, CheckCircle2, Globe2, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../lib/i18n';
import CMSImage from '../components/CMSImage';

export default function Imports() {
  const { t } = useTranslation();
  const importItems = [
    {
      id: 'vehicles',
      name: t('imports.cat.vehicles'),
      icon: Truck,
      desc: t('imports.cat.vehicles.desc'),
      features: ['Heavy Duty Commercial Trucks', 'Construction Fleet & Dumpers', 'Full Customs & Port Clearance'],
      subject: 'Heavy Vehicles & Fleet Procurement Inquiry'
    },
    {
      id: 'machinery',
      name: t('imports.cat.machinery'),
      icon: Settings,
      desc: t('imports.cat.machinery.desc'),
      features: ['Industrial Manufacturing Units', 'Earthmoving & Mining Gear', 'Operator Training & Spares Support'],
      subject: 'Industrial Machinery & Equipment Import Inquiry'
    },
    {
      id: 'parts',
      name: t('imports.cat.parts'),
      icon: Zap,
      desc: t('imports.cat.parts.desc'),
      features: ['OEM Certified Auto Parts', 'Electrical Grid Systems', 'Rapid Air/Sea Express Logistics'],
      subject: 'Spare Parts & Electrical Equipment Procurement'
    },
    {
      id: 'materials',
      name: t('imports.cat.materials'),
      icon: Droplets,
      desc: t('imports.cat.materials.desc'),
      features: ['Bulk Industrial Chemicals', 'Certified Construction Grade Feeds', 'Factory Direct Sourcing'],
      subject: 'Industrial Raw Materials & Chemical Feeds Inquiry'
    }
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

      {/* Import Grid with Clickable Cards */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-orange-600 font-bold uppercase tracking-widest text-xs block mb-3">
              Strategic Sourcing & Delivery
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-950 tracking-tight mb-4">
              Select an Import Category for Instant Quotation
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              Click any category below to initiate a dedicated procurement inquiry with our international logistics desk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {importItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link
                  to={`/contact?subject=${encodeURIComponent(item.subject)}&type=import`}
                  className="flex flex-col h-full p-8 bg-white border border-gray-100 rounded-3xl group hover:shadow-2xl hover:border-orange-300 hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-125"></div>

                  <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-6 border border-blue-100 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
                    <item.icon size={26} />
                  </div>

                  <h3 className="text-xl font-bold text-blue-950 mb-3 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="space-y-2 mb-8 mt-auto pt-4 border-t border-gray-100">
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-600">
                        <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-orange-600 transition-colors uppercase tracking-wider pt-3 border-t border-gray-50">
                    <span>Request Quotation</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform text-orange-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Assurance Section */}
      <section className="py-16 bg-blue-950 text-white border-y border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base">Verified Global Sourcing</h4>
                <p className="text-xs text-blue-200 mt-1">Direct OEM and Tier-1 certified international manufacturers.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0">
                <Globe2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base">Door-to-Door Logistics</h4>
                <p className="text-xs text-blue-200 mt-1">End-to-end customs clearing, inland freight, and port handling.</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base">LC & Financing Support</h4>
                <p className="text-xs text-blue-200 mt-1">Flexible banking trade mechanisms and procurement advisory.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimalistic CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <p className="text-gray-600 mb-8 italic text-lg">
            "{t('imports.cta.quote')}"
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-600/30 uppercase tracking-widest text-sm"
          >
            <span>{t('imports.cta.partnership')}</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
