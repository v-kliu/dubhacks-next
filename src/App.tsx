import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ProgramOverviewSection from './components/ProgramOverviewSection';
import TracksSection from './components/TracksSection';
import UpcomingEventsSection from './components/UpcomingEventsSection';
import FounderSuccessSection from './components/FounderSuccessSection';
import TimelineSection from './components/TimelineSection';
import TeamSection from './components/TeamSection';
import WhyUWSection from './components/WhyUWSection';
import SpeakersSection from './components/SpeakersSection';
import PhotoGallerySection from './components/PhotoGallerySection';
import FAQSection from './components/FAQSection';
import ResourcesSection from './components/ResourcesSection';
import ApplicationCTASection from './components/ApplicationCTASection';
import Footer from './components/Footer';
import StartupDirectory from './components/StartupDirectory';
import FounderDirectory from './components/FounderDirectory';
import SponsorsSection from './components/SponsorsSection';
import EasterEggPage from './components/EasterEggPage';

// Home page component
const HomePage: React.FC<{ onLoadComplete?: () => void }> = ({ onLoadComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoadComplete?.();
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {!isLoading && (
        <>
          <HeroSection />
          <StatsSection />
          <SponsorsSection />
          <ProgramOverviewSection />
          <TracksSection />
          <UpcomingEventsSection />
          <FounderSuccessSection />
          <TimelineSection />
          <PhotoGallerySection />
          <TeamSection />
          <WhyUWSection />
          <SpeakersSection />
          <FAQSection />
          <ResourcesSection />
          <ApplicationCTASection />
        </>
      )}
    </>
  );
};

const AppContent: React.FC = () => {
  const [isHomePageLoaded, setIsHomePageLoaded] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Reset isHomePageLoaded when navigating TO home page from another page
  useEffect(() => {
    const prevPath = prevPathRef.current;
    const currentPath = location.pathname;

    // If we're navigating TO home from a different page, reset the loaded state
    if (currentPath === '/' && prevPath !== '/') {
      setIsHomePageLoaded(false);
    }

    prevPathRef.current = currentPath;
  }, [location.pathname]);

  const handleHomePageLoadComplete = () => {
    setIsHomePageLoaded(true);
  };

  const isHomePage = location.pathname === '/';
  const isSecretPage = location.pathname === '/secret';
  // Only show footer on home page after loading completes, always show on other pages
  // Never show main footer/nav on the secret page (it has its own)
  const shouldShowFooter = !isSecretPage && (!isHomePage || isHomePageLoaded);

  return (
    <div className="App">
      {!isSecretPage && <Navigation />}
      <Routes>
        <Route path="/" element={<HomePage key={location.key} onLoadComplete={handleHomePageLoadComplete} />} />
        <Route path="/startup-directory" element={<StartupDirectory />} />
        <Route path="/founder-directory" element={<FounderDirectory />} />
        <Route path="/secret" element={<EasterEggPage />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;