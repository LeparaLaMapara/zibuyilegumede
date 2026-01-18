import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Analytics } from '@vercel/analytics/react';  // for performance monitoring


// Lazy loading pages for performance
const Films = lazy(() => import('./pages/Films'));
const Photography = lazy(() => import('./pages/Photography'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-12 h-12 border-2 border-gray-200 border-t-gold rounded-full animate-spin"></div>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen font-sans bg-white text-dark selection:bg-gold selection:text-white">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/films" element={<Films />} />
              <Route path="/" element={<About />} />
              <Route path="/photography" element={<Photography />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;