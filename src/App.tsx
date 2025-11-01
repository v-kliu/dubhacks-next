import React, { useState } from 'react';
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
import MoneyMode from './components/MoneyMode';

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
  const [isMoneyMode, setIsMoneyMode] = useState(false);
  const [isHomePageLoaded, setIsHomePageLoaded] = useState(false);
  const location = useLocation();

  const toggleMoneyMode = () => {
    setIsMoneyMode((prev) => !prev);
  };

  const handleHomePageLoadComplete = () => {
    setIsHomePageLoaded(true);
  };

  const isHomePage = location.pathname === '/';
  const shouldShowFooter = !isHomePage || isHomePageLoaded;

  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage onLoadComplete={handleHomePageLoadComplete} />} />
        <Route path="/startup-directory" element={<StartupDirectory />} />
        <Route path="/founder-directory" element={<FounderDirectory />} />
      </Routes>
      {shouldShowFooter && <Footer onHeartClick={toggleMoneyMode} />}
      <MoneyMode isActive={isMoneyMode} />
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