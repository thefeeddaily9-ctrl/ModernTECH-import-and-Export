import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from '../lib/i18n';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission - in a real app, this would send to Firebase
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <section className="py-24 bg-blue-950 text-white relative">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-orange-500/10 skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">{t('contact.title')}</h1>
            <p className="text-xl text-blue-200 font-light max-w-2xl leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6 tracking-tight">{t('footer.contact')}</h2>
                <p className="text-gray-500 text-lg leading-relaxed">
                  {t('contact.desc')}
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-950 group-hover:text-white transition-all">
                    <MapPin size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-blue-900 mb-1 uppercase tracking-tighter">{t('contact.locations')}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-blue-900 font-bold text-sm">Addis Ababa, Ethiopia</p>
                        <p className="text-gray-500 text-sm leading-relaxed">{t('footer.description').includes('Addis') ? 'Africa Avenue, Africa Insurance 3rd floor' : 'Africa Avenue, Africa Insurance 3rd floor'}</p>
                      </div>
                      <div>
                        <p className="text-blue-900 font-bold text-sm">Dubai, UAE</p>
                        <p className="text-gray-500 text-sm leading-relaxed">Strategic Business Hub, Dubai</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-950 group-hover:text-white transition-all">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900 mb-1 uppercase tracking-tighter">{t('contact.lines')}</h4>
                    <p className="text-gray-500 leading-relaxed text-lg font-medium">+251 911 256838</p>
                    <p className="text-gray-500 leading-relaxed text-lg font-medium">+251 912 806514</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-950 group-hover:text-white transition-all">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-blue-900 mb-1 uppercase tracking-tighter">{t('contact.emails')}</h4>
                    <p className="text-gray-500 leading-relaxed text-lg font-medium">info@moderntechethiopia.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-gray-100 relative"
            >
              <div className="absolute -top-6 left-12 px-6 py-2 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-2">
                <MessageSquare size={14} /> {t('nav.contact')}
              </div>

              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Send size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">{t('form.success')}</h3>
                  <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
                    {t('contact.success.desc')}
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-blue-900 mb-8 tracking-tight">{t('contact.commercial')}</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('form.name')}</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Name"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('form.email')}</label>
                        <input 
                          type="email" 
                          required
                          placeholder="Email"
                          className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('form.subject')}</label>
                      <input 
                        type="text"
                        required
                        placeholder="Subject"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">{t('form.message')}</label>
                      <textarea 
                        rows={4} 
                        required
                        placeholder="Description"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3"
                    >
                      {t('form.send')} <Send size={20} />
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 w-full bg-gray-100 relative grayscale hover:grayscale-0 transition-all duration-700 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-center bg-no-repeat bg-cover opacity-60"></div>
        <div className="absolute inset-0 bg-blue-950/20"></div>
        <div className="relative h-full flex items-center justify-center">
            <div className="p-6 bg-white rounded-2xl shadow-2xl border border-gray-100 text-center max-w-xs">
                <MapPin className="text-orange-500 mx-auto mb-4" size={32} />
                <h4 className="font-bold text-blue-900 mb-2">Our Presence</h4>
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-tighter">Strategic Handling Offices in Addis Ababa and Dubai.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
