import React, { useState } from 'react';
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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="App">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {!isLoading && (
        <>
          <Navigation />
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
    </div>
  );
}

export default App;