import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';
import { saveInquiry } from '../lib/firebase';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Ethiopian Green Coffee Inquiry',
    volume: '1 FCL Container (~19.2 MT)',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await saveInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        volume: formData.volume,
        message: formData.message,
        productType: 'general',
        status: 'new'
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
      // Still show submitted gracefully
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Moderntech Export Desk,%0A%0A*Name / Company:* ${formData.name || 'Importer'}%0A*Email:* ${formData.email || 'N/A'}%0A*Product:* ${formData.subject}%0A*Volume:* ${formData.volume}%0A*Message:* ${formData.message || 'I would like to request an export quote and current FOB price list.'}`
    );
    window.open(`https://wa.me/251931573392?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-amber-500/10 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-3 block">
              {t('contact.presence.title')}
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">{t('contact.title')}</h1>
            <p className="text-lg text-slate-300 font-light max-w-2xl leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">{t('footer.contact')}</h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  {t('contact.desc')}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{t('contact.locations')}</h4>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div>
                        <strong className="text-slate-900 block">{t('contact.address.hq.title')}</strong>
                        <span>{t('contact.address.hq.desc')}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200">
                        <strong className="text-slate-900 block">{t('contact.address.uae.title')}</strong>
                        <span>{t('contact.address.uae.desc')}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{t('contact.lines')}</h4>
                    <p className="text-slate-700 font-mono text-sm font-medium">+251 911 256838 (Direct Line & Inquiries)</p>
                    <p className="text-slate-700 font-mono text-sm font-medium">+251 118 223301 (Addis Ababa Office)</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-1">{t('contact.emails')}</h4>
                    <p className="text-slate-700 text-sm font-medium">info@moderntechethiopia.com</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Box */}
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-emerald-950 text-base">Direct WhatsApp Response</h4>
                  <p className="text-xs text-emerald-800 mt-0.5">Chat directly with our coffee & commodity export team.</p>
                </div>
                <button
                  onClick={handleWhatsApp}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0"
                >
                  <MessageCircle size={16} /> Open WhatsApp Chat
                </button>
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{t('form.success')}</h3>
                  <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
                    {t('contact.success.desc')}
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleWhatsApp}
                      className="px-6 py-3 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} /> Open WhatsApp
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
                    >
                      New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <span className="text-amber-600 text-xs font-bold uppercase tracking-wider block mb-1">Commercial Inquiries</span>
                    <h3 className="text-2xl font-bold text-slate-900">{t('contact.commercial')}</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{t('form.name')} *</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Your Name or Company"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{t('form.email')} *</label>
                        <input 
                          type="email" 
                          required
                          placeholder="buyer@company.com"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{t('form.subject')}</label>
                        <select
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                        >
                          <option value="Ethiopian Green Coffee - Specialty G1/G2">Ethiopian Coffee (Specialty G1/G2)</option>
                          <option value="Ethiopian Green Coffee - Commercial G4/G5">Ethiopian Coffee (Commercial G4/G5)</option>
                          <option value="Sesame Seeds (Humera / Wollega)">Sesame Seeds (Humera / Wollega)</option>
                          <option value="Soybeans / Chickpeas / Niger Seeds">Soybeans & Pulses</option>
                          <option value="High-Purity Minerals (Gold/Tantalum/Opal)">High-Purity Minerals</option>
                          <option value="Import Sourcing Services">Import Services</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">Volume</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Sample, 10 Bags, 1 FCL Container"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                          value={formData.volume}
                          onChange={e => setFormData({...formData, volume: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{t('form.message')}</label>
                      <textarea 
                        rows={4} 
                        placeholder="Please include your destination port, specific grade or cup requirements, and preferred shipping timeline."
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium text-sm text-slate-900"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button 
                        type="submit"
                        className="flex-1 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <Send size={16} /> {t('form.send')}
                      </button>
                      <button 
                        type="button"
                        onClick={handleWhatsApp}
                        className="py-3.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} /> WhatsApp
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
