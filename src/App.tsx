import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingScreen from './components/LoadingScreen';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import StatsSection from './components/StatsSection';
import ManifestoSection from './components/ManifestoSection';
import ProgramOverviewSection from './components/ProgramOverviewSection';
import TracksSection from './components/TracksSection';
import AlumniSuccessSection from './components/AlumniSuccessSection';
import TimelineSection from './components/TimelineSection';
import TeamSection from './components/TeamSection';
import DemoDaySection from './components/DemoDaySection';
import WhyUWSection from './components/WhyUWSection';
import FAQSection from './components/FAQSection';
import ApplicationCTASection from './components/ApplicationCTASection';
import PartnersSection from './components/PartnersSection';
import Footer from './components/Footer';
import StartupDirectory from './components/StartupDirectory';
import FounderDirectory from './components/FounderDirectory';

// Home page component
const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          <HeroSection />
          <StatsSection />
          <ManifestoSection />
          <ProgramOverviewSection />
          <TracksSection />
          <AlumniSuccessSection />
          <TimelineSection />
          <TeamSection />
          <DemoDaySection />
          <WhyUWSection />
          <PartnersSection />
          <FAQSection />
          <ApplicationCTASection />
          <Footer />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/startup-directory" element={<StartupDirectory />} />
          <Route path="/founder-directory" element={<FounderDirectory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;