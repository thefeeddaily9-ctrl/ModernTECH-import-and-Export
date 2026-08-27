/**
 * Moderntech Export & Import PLC - Web Platform
 * Build & Sync: 2026-08-27
 */
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import { AdminProvider, useAdmin } from './lib/AdminContext';
import { ImageCMSProvider } from './lib/ImageCMSContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminPortal from './components/AdminPortal';
import Home from './pages/Home';
import About from './pages/About';
import Exports from './pages/Exports';
import Coffee from './pages/products/Coffee';
import Minerals from './pages/products/Minerals';
import Seeds from './pages/products/Seeds';
import Imports from './pages/Imports';
import Contact from './pages/Contact';
import AdminPage from './pages/AdminPage';
import { logActivity } from './lib/firebase';

function PageTracker() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (pathname !== '/admin' && pathname !== '/admin-portal') {
      // Log page navigation activity
      logActivity('page_view', { page: pathname }).catch(() => {});
    }
  }, [pathname]);
  
  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname === '/admin' || pathname === '/admin-portal';

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-portal" element={<AdminPage />} />
        </Routes>
        <FloatingWhatsApp />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900 relative ltr:text-left rtl:text-right">
      {/* Thematic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-[url('/assets/images/regenerated_image_1778502393186.png')] bg-cover bg-no-repeat grayscale"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/assets/images/regenerated_image_1778505448378.png')] bg-cover bg-no-repeat grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white"></div>
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/exports" element={<Exports />} />
            <Route path="/exports/coffee" element={<Coffee />} />
            <Route path="/exports/minerals" element={<Minerals />} />
            <Route path="/exports/seeds" element={<Seeds />} />
            <Route path="/imports" element={<Imports />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-portal" element={<AdminPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
        <AdminPortal />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AdminProvider>
        <ImageCMSProvider>
          <Router>
            <PageTracker />
            <MainLayout />
          </Router>
        </ImageCMSProvider>
      </AdminProvider>
    </I18nProvider>
  );
}

