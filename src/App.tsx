/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { I18nProvider } from './lib/i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Exports from './pages/Exports';
import Coffee from './pages/products/Coffee';
import Minerals from './pages/products/Minerals';
import Seeds from './pages/products/Seeds';
import Beans from './pages/products/Beans';
import Imports from './pages/Imports';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

export default function App() {
  return (
    <I18nProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-white selection:bg-orange-100 selection:text-orange-900 relative ltr:text-left rtl:text-right">
          {/* Thematic Background Elements */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-[0.03]">
            <div className="absolute top-0 left-0 w-1/2 h-full bg-[url('/src/assets/images/regenerated_image_1778502393186.png')] bg-cover bg-no-repeat grayscale"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/src/assets/images/regenerated_image_1778505448378.png')] bg-cover bg-no-repeat grayscale"></div>
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
                <Route path="/exports/beans" element={<Beans />} />
                <Route path="/imports" element={<Imports />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </Router>
    </I18nProvider>
  );
}

