import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coffee as CoffeeIcon, 
  MapPin, 
  BadgeCheck, 
  Ship, 
  ArrowRight, 
  Star, 
  Globe, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  Filter, 
  Send, 
  MessageCircle, 
  FileText, 
  Layers, 
  Sparkles, 
  X 
} from 'lucide-react';
import { useTranslation } from '../../lib/i18n';
import { saveInquiry } from '../../lib/firebase';
import CMSImage from '../../components/CMSImage';

interface CoffeeLot {
  id: string;
  name: string;
  region: string;
  zone: string;
  altitude: string;
  process: 'Washed' | 'Natural' | 'Washed & Natural';
  grade: 'Grade 1 Specialty' | 'Grade 2 Specialty' | 'Grade 2 & 3' | 'Grade 4 Commercial' | 'Grade 4/5 Commercial';
  category: 'specialty' | 'commercial';
  varieties: string;
  harvest: string;
  screenSize: string;
  moisture: string;
  flavorNotes: string[];
  description: string;
  imageKey: string;
  fallback: string;
}

export default function Coffee() {
  const { t } = useTranslation();
  
  // Filtering state
  const [selectedProcess, setSelectedProcess] = useState<'all' | 'Washed' | 'Natural'>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'specialty' | 'commercial'>('all');

  // Quotation modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedCoffeeForQuote, setSelectedCoffeeForQuote] = useState<string>('Yirgacheffe Specialty Grade 1');
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '1 FCL (approx. 19.2 MT / 320 Bags)',
    packaging: '60 kg Jute Bags with GrainPro Liners',
    destinationPort: '',
    notes: ''
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const coffeeList: CoffeeLot[] = [
    {
      id: 'yirgacheffe',
      name: 'Yirgacheffe Specialty G1 / G2',
      region: 'Gedeo Zone, SNNPR / Oromia border',
      zone: 'Yirgacheffe & Kochere',
      altitude: '1,900 – 2,200 MASL',
      process: 'Washed & Natural',
      grade: 'Grade 1 Specialty',
      category: 'specialty',
      varieties: 'Indigenous Heirloom, Kurume, Dega',
      harvest: 'November – January',
      screenSize: 'Screen 15+',
      moisture: '10.2% – 11.2%',
      flavorNotes: ['Jasmine Floral', 'Bergamot', 'Sweet Lemon', 'Peach Nectar', 'Silky Black Tea Body'],
      description: t('coffee.region.yirgacheffe'),
      imageKey: 'coffee_yirgacheffe',
      fallback: '/assets/images/regenerated_image_1778502393186.png'
    },
    {
      id: 'guji',
      name: 'Guji Specialty G1 / G2',
      region: 'Guji Zone, Oromia',
      zone: 'Shakiso, Uraga & Hambela',
      altitude: '2,000 – 2,350 MASL',
      process: 'Washed & Natural',
      grade: 'Grade 1 Specialty',
      category: 'specialty',
      varieties: 'Heirloom 74110 & 74112 Selections',
      harvest: 'November – February',
      screenSize: 'Screen 15+',
      moisture: '10.0% – 11.0%',
      flavorNotes: ['Ripe Blueberry', 'Lavender', 'Peach', 'Dark Chocolate', 'Juicy Complex Acidity'],
      description: t('coffee.region.guji'),
      imageKey: 'coffee_guji',
      fallback: '/assets/images/regenerated_image_1778504171098.png'
    },
    {
      id: 'sidamo',
      name: 'Sidamo Specialty G2 & G3',
      region: 'Sidama Zone',
      zone: 'Bensa, Aleta Wondo & Chire',
      altitude: '1,750 – 2,050 MASL',
      process: 'Washed & Natural',
      grade: 'Grade 2 Specialty',
      category: 'specialty',
      varieties: 'Indigenous Ethiopian Heirloom',
      harvest: 'October – January',
      screenSize: 'Screen 14 – 17',
      moisture: '10.5% – 11.5%',
      flavorNotes: ['Red Berry Jam', 'Citrus Blossom', 'Cane Sugar', 'Honeyed Texture'],
      description: t('coffee.region.sidamo'),
      imageKey: 'coffee_sidamo',
      fallback: '/assets/images/regenerated_image_1778504167950.png'
    },
    {
      id: 'limu',
      name: 'Limu Specialty Grade 2',
      region: 'Jimma / Limu Kosa, Oromia',
      zone: 'Limu Seka & Agaro',
      altitude: '1,650 – 1,950 MASL',
      process: 'Washed',
      grade: 'Grade 2 Specialty',
      category: 'specialty',
      varieties: 'Heirloom & Improved 74-series',
      harvest: 'November – January',
      screenSize: 'Screen 15 – 17',
      moisture: '10.2% – 11.2%',
      flavorNotes: ['Winey Sweetness', 'Crisp Green Apple', 'Baking Spice', 'Balanced Clean Finish'],
      description: t('coffee.region.limu'),
      imageKey: 'coffee_limu',
      fallback: '/assets/images/regenerated_image_1778504163293.png'
    },
    {
      id: 'harrar',
      name: 'Harrar Longberry Grade 4',
      region: 'Eastern Highlands, Oromia',
      zone: 'East Hararghe',
      altitude: '1,500 – 2,100 MASL',
      process: 'Natural',
      grade: 'Grade 4 Commercial',
      category: 'commercial',
      varieties: 'Native Harar Longberry & Shortberry',
      harvest: 'December – March',
      screenSize: 'Screen 15+',
      moisture: '10.5% – 11.5%',
      flavorNotes: ['Wild Sun-dried Blueberry', 'Heavy Dark Mocha', 'Dried Fig', 'Bold Syrupy Body'],
      description: t('coffee.region.harrar'),
      imageKey: 'coffee_harrar',
      fallback: '/assets/images/regenerated_image_1778503783582.png'
    },
    {
      id: 'jimma',
      name: 'Jimma & Kaffa Grade 4/5',
      region: 'Southwestern Highlands, Oromia',
      zone: 'Jimma & Kaffa Biosphere',
      altitude: '1,400 – 1,850 MASL',
      process: 'Natural',
      grade: 'Grade 4/5 Commercial',
      category: 'commercial',
      varieties: 'Traditional Forest & Semi-Forest Heirloom',
      harvest: 'October – January',
      screenSize: 'Screen 14+',
      moisture: '10.5% – 11.8%',
      flavorNotes: ['Rich Cocoa', 'Roasted Hazelnut', 'Earthy Nuance', 'Heavy Espresso Body'],
      description: t('coffee.region.jimma'),
      imageKey: 'coffee_jimma',
      fallback: '/assets/images/regenerated_image_1778503793603.png'
    }
  ];

  const filteredCoffees = coffeeList.filter(item => {
    const matchesProcess = 
      selectedProcess === 'all' || 
      item.process.includes(selectedProcess);
    const matchesCategory = 
      selectedCategory === 'all' || 
      item.category === selectedCategory;
    return matchesProcess && matchesCategory;
  });

  const openQuoteFor = (coffeeName: string) => {
    setSelectedCoffeeForQuote(coffeeName);
    setQuoteModalOpen(true);
    setQuoteSubmitted(false);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveInquiry({
        name: quoteForm.name + (quoteForm.company ? ` (${quoteForm.company})` : ''),
        email: quoteForm.email,
        phone: quoteForm.phone,
        subject: `Coffee Quote: ${selectedCoffeeForQuote}`,
        volume: quoteForm.quantity,
        destinationPort: quoteForm.destinationPort,
        packaging: quoteForm.packaging,
        message: quoteForm.notes,
        productType: 'coffee',
        status: 'new'
      });
    } catch (err) {
      console.error('Error saving coffee quote:', err);
    }
    setQuoteSubmitted(true);
  };

  const handleWhatsAppQuote = () => {
    const message = `Hello Moderntech Export Desk,%0A%0AI would like to request an export quotation for:%0A- Product: ${encodeURIComponent(selectedCoffeeForQuote)}%0A- Volume: ${encodeURIComponent(quoteForm.quantity)}%0A- Packaging: ${encodeURIComponent(quoteForm.packaging)}%0A- Destination Port: ${encodeURIComponent(quoteForm.destinationPort || 'Not specified')}%0A- Buyer: ${encodeURIComponent(quoteForm.name || 'Importer')} (${encodeURIComponent(quoteForm.company || 'Company')})%0A- Email: ${encodeURIComponent(quoteForm.email || 'N/A')}%0A- Notes: ${encodeURIComponent(quoteForm.notes || 'Please provide current FOB Djibouti pricing and sample availability.')}`;
    window.open(`https://wa.me/251931573392?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative min-h-[75vh] flex items-center justify-start text-white overflow-hidden bg-slate-950">
        <div className="absolute inset-0 z-0">
          <CMSImage 
            imageKey="coffee_hero_bg"
            fallback="/assets/images/regenerated_image_1778502393186.png"
            alt="Ethiopian Green Coffee Beans" 
            className="w-full h-full object-cover scale-105 opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.25em] uppercase bg-amber-600/90 text-white rounded-full border border-amber-400/30 shadow-sm">
              <Star size={14} className="fill-white" /> 100% Arabica Green Coffee Exporter
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.05]">
              Ethiopian Green Coffee <br />
              <span className="text-amber-400">Direct From Origin</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-200 mb-8 font-light leading-relaxed">
              {t('coffee.catalog.subtitle')}
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 text-xs font-semibold">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex flex-col">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Origins</span>
                <span className="text-white text-sm">Yirgacheffe, Guji, Sidamo</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex flex-col">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Grades</span>
                <span className="text-white text-sm">Specialty G1/G2 & Commercial</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex flex-col">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Packaging</span>
                <span className="text-white text-sm">60kg GrainPro Jute Bags</span>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex flex-col">
                <span className="text-amber-400 font-bold uppercase tracking-wider">Delivery</span>
                <span className="text-white text-sm">FOB Djibouti / FCA Addis</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => openQuoteFor('General Coffee Export Inquiry')}
                className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg transition-all shadow-xl shadow-amber-500/20 text-center flex items-center justify-center gap-2 text-base"
              >
                <FileText size={18} /> {t('coffee.cta.bulk')}
              </button>
              <a 
                href="#catalog" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-lg font-semibold transition-all text-center flex items-center justify-center gap-2 text-base"
              >
                <Layers size={18} /> Browse Coffee Lots
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Catalog Filter and Overview */}
      <section id="catalog" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2">Export Green Coffee Offerings</div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">Available Ethiopian Origins & Grades</h2>
              <p className="text-slate-500 mt-2 max-w-2xl text-base">
                Select from single-origin specialty microlots to consistent commercial container-load volumes.
              </p>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-2 items-center">
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Grades
                </button>
                <button
                  onClick={() => setSelectedCategory('specialty')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedCategory === 'specialty' ? 'bg-white text-amber-700 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Specialty (G1 / G2)
                </button>
                <button
                  onClick={() => setSelectedCategory('commercial')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedCategory === 'commercial' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Commercial (G4 / G5)
                </button>
              </div>

              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
                <button
                  onClick={() => setSelectedProcess('all')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedProcess === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Processes
                </button>
                <button
                  onClick={() => setSelectedProcess('Washed')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedProcess === 'Washed' ? 'bg-white text-blue-700 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Washed
                </button>
                <button
                  onClick={() => setSelectedProcess('Natural')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    selectedProcess === 'Natural' ? 'bg-white text-amber-700 font-bold shadow-sm' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Natural Sundried
                </button>
              </div>
            </div>
          </div>

          {/* Coffee Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCoffees.map((coffee) => (
              <motion.div
                key={coffee.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 flex flex-col group"
              >
                {/* Image Header */}
                <div className="relative h-56 overflow-hidden bg-slate-900">
                  <CMSImage 
                    imageKey={coffee.imageKey} 
                    fallback={coffee.fallback}
                    alt={`Ethiopian Green Coffee - ${coffee.name}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      coffee.category === 'specialty' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-white'
                    }`}>
                      {coffee.grade}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-900 rounded-full text-xs font-semibold">
                      {coffee.process}
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                    <div className="flex items-center gap-1 font-medium">
                      <MapPin size={14} className="text-amber-400" /> {coffee.zone}
                    </div>
                    <div className="font-mono text-amber-300 font-semibold">
                      {coffee.altitude}
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">
                    {coffee.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mb-4">
                    {coffee.region} • {coffee.varieties}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {coffee.description}
                  </p>

                  {/* Flavor Notes Chips */}
                  <div className="mb-6">
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Cupping Profile</div>
                    <div className="flex flex-wrap gap-1.5">
                      {coffee.flavorNotes.map((note, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md text-xs font-medium"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specs Table */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 mb-6 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-sans">Screen Size</span>
                      <span className="text-slate-800 font-semibold">{coffee.screenSize}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-sans">Target Moisture</span>
                      <span className="text-slate-800 font-semibold">{coffee.moisture}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => openQuoteFor(coffee.name)}
                      className="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Send size={14} /> Request Quote / Sample
                    </button>
                    <button
                      onClick={() => {
                        const text = `Hello Moderntech, I am interested in inquiring about ${encodeURIComponent(coffee.name)} (Crop availability, sample, FOB pricing).`;
                        window.open(`https://wa.me/251911256838?text=${text}`, '_blank', 'noopener,noreferrer');
                      }}
                      title="Quick Inquiry on WhatsApp"
                      className="p-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors border border-emerald-200"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export Specifications & Logistics */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-2 block">Standard Export Protocol</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">{t('coffee.spec.title')}</h2>
            <p className="text-slate-300 mt-3 text-base">
              Every container lot prepared by Moderntech complies with Ethiopian Coffee and Tea Authority standards and international food safety requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                <Package size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Packaging & Hermetic Protection</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {t('coffee.spec.packaging')}
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Multi-barrier GrainPro / Ecotact bags
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> New clean odorless export jute sacks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> 30kg vacuum master boxes on request
                </li>
              </ul>
            </div>

            <div className="p-8 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quality Grading & Cupping</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {t('coffee.spec.moisture')}
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Pre-shipment samples (PSS) provided
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> ECX & CLU lab certification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Physical defect counting & cupping score
                </li>
              </ul>
            </div>

            <div className="p-8 bg-slate-800/80 rounded-2xl border border-slate-700">
              <div className="w-12 h-12 bg-amber-500/20 text-amber-400 rounded-xl flex items-center justify-center mb-6">
                <Ship size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Shipping & Incoterms</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                {t('coffee.spec.shipping')}
              </p>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> FOB Port of Djibouti or FCA Addis Ababa
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Full container load (FCL: 320–360 bags)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-amber-400" /> Complete phytosanitary & origin papers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Processing & Traceability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-amber-600 font-bold uppercase tracking-widest text-xs mb-2 block">Origin Infrastructure</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-6">
                {t('coffee.quality.title')}
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                {t('coffee.quality.p1')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Selective Cherry Harvesting & Floating</h4>
                    <p className="text-sm text-slate-500">Ripe red cherries handpicked by smallholder farmers, followed by water density floating to remove under-ripes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Raised Bed Drying & Moisture Control</h4>
                    <p className="text-sm text-slate-500">Beans dried slowly for 12–20 days on ventilated African raised beds with frequent hourly turning until moisture reaches 10.5%–11.5%.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">Dry Milling, Color Sorting & Cupping</h4>
                    <p className="text-sm text-slate-500">Hulled and graded in Addis Ababa using gravity separators and optical color sorters, tested by certified Q-graders.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
                <CMSImage 
                  imageKey="coffee_drying_beds"
                  fallback="/assets/images/regenerated_image_1778504163293.png" 
                  alt="Ethiopian Coffee Drying Beds" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-md translate-y-6">
                <CMSImage 
                  imageKey="coffee_cupping_lab"
                  fallback="/assets/images/regenerated_image_1778504171098.png" 
                  alt="Green Coffee Inspection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Quotation & Sample Request Section */}
      <section className="py-20 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-slate-200 relative">
            <div className="text-center mb-10">
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full inline-block mb-3">
                Direct Export Desk
              </span>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Request a Green Coffee Quotation or Samples</h2>
              <p className="text-slate-500 text-sm mt-2">
                Specify your desired origin, grade, volume, and destination port. We will prepare an FOB / FCA quote and contract draft.
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">{t('form.success')}</h3>
                <p className="text-slate-500 max-w-md mx-auto text-sm">
                  {t('contact.success.desc')}
                </p>
                <div className="pt-6 flex flex-col sm:flex-row justify-center gap-3">
                  <button
                    onClick={handleWhatsAppQuote}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl inline-flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                  >
                    <MessageCircle size={18} /> Continue Details on WhatsApp
                  </button>
                  <button
                    onClick={() => setQuoteSubmitted(false)}
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Selected Origin & Grade
                    </label>
                    <select
                      value={selectedCoffeeForQuote}
                      onChange={(e) => setSelectedCoffeeForQuote(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                    >
                      {coffeeList.map(c => (
                        <option key={c.id} value={c.name}>{c.name} ({c.process})</option>
                      ))}
                      <option value="Custom Blend / Multiple Origins">Multiple Origins / Custom Container Mix</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Estimated Volume
                    </label>
                    <select
                      value={quoteForm.quantity}
                      onChange={(e) => setQuoteForm({...quoteForm, quantity: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                    >
                      <option value="Sample Request (1 - 5 kg)">Sample Request (1 – 5 kg airfreight)</option>
                      <option value="Trial Pallet (10 – 30 Bags)">Trial Pallet (10 – 30 Bags / ~1.8 MT)</option>
                      <option value="Half Container (160 Bags / ~9.6 MT)">Half Container (160 Bags / ~9.6 MT)</option>
                      <option value="1 FCL (320 Bags / ~19.2 MT)">1 FCL Container (320 Bags / ~19.2 MT)</option>
                      <option value="Multiple Containers (2+ FCL)">Multiple Containers (2+ FCL / 38+ MT)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      {t('form.name')} *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe / Highland Roasting Co."
                      value={quoteForm.name}
                      onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      {t('form.email')} *
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. buyer@company.com"
                      value={quoteForm.email}
                      onChange={e => setQuoteForm({...quoteForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Phone / WhatsApp Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="e.g. +1 555 123 4567"
                      value={quoteForm.phone}
                      onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                      Destination Port / Country
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Port of Hamburg, Germany / Long Beach, USA"
                      value={quoteForm.destinationPort}
                      onChange={e => setQuoteForm({...quoteForm, destinationPort: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Additional Specifications & Notes
                  </label>
                  <textarea 
                    rows={3} 
                    placeholder="Provide any specific cup requirements, screen sizing, or delivery timeframe."
                    value={quoteForm.notes}
                    onChange={e => setQuoteForm({...quoteForm, notes: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button 
                    type="submit"
                    className="flex-1 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send size={16} /> Submit Export Inquiry
                  </button>
                  <button 
                    type="button"
                    onClick={handleWhatsAppQuote}
                    className="py-4 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={18} /> Inquire on WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quotation Dialog Modal */}
      <AnimatePresence>
        {quoteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative"
            >
              <button 
                onClick={() => setQuoteModalOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="mb-6 pr-8">
                <span className="text-amber-600 text-xs font-bold uppercase tracking-wider">Direct Coffee Quote</span>
                <h3 className="text-2xl font-bold text-slate-900">{selectedCoffeeForQuote}</h3>
                <p className="text-xs text-slate-500 mt-1">Get FOB Djibouti / FCA Addis Ababa export pricing.</p>
              </div>

              {quoteSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 size={40} className="text-emerald-500 mx-auto" />
                  <h4 className="text-xl font-bold text-slate-900">{t('form.success')}</h4>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto">
                    {t('contact.success.desc')}
                  </p>
                  <div className="pt-4 flex flex-col gap-2">
                    <button
                      onClick={handleWhatsAppQuote}
                      className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} /> Continue on WhatsApp
                    </button>
                    <button
                      onClick={() => setQuoteModalOpen(false)}
                      className="w-full py-2.5 text-slate-600 text-xs font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Full Name / Company *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. Sarah Jenkins (West Coast Roasters)" 
                      value={quoteForm.name} 
                      onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Email *</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="buyer@domain.com" 
                        value={quoteForm.email} 
                        onChange={e => setQuoteForm({...quoteForm, email: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">WhatsApp / Phone</label>
                      <input 
                        type="tel" 
                        placeholder="+1 ..." 
                        value={quoteForm.phone} 
                        onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Quantity</label>
                      <select
                        value={quoteForm.quantity}
                        onChange={(e) => setQuoteForm({...quoteForm, quantity: e.target.value})}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      >
                        <option value="Sample (1-5 kg)">Sample (1-5 kg)</option>
                        <option value="10-30 Bags (~1.8 MT)">10-30 Bags (~1.8 MT)</option>
                        <option value="1 FCL (320 Bags / 19.2 MT)">1 FCL (320 Bags / 19.2 MT)</option>
                        <option value="Multiple Containers">Multiple Containers</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Destination Port</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Hamburg / Incheon" 
                        value={quoteForm.destinationPort} 
                        onChange={e => setQuoteForm({...quoteForm, destinationPort: e.target.value})}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Notes</label>
                    <textarea 
                      rows={2} 
                      placeholder="Special requirements, crop timing, etc."
                      value={quoteForm.notes}
                      onChange={e => setQuoteForm({...quoteForm, notes: e.target.value})}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3">
                    <button 
                      type="submit" 
                      className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Send size={14} /> Submit Quote Request
                    </button>
                    <button 
                      type="button" 
                      onClick={handleWhatsAppQuote}
                      className="py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle size={16} /> WhatsApp
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
