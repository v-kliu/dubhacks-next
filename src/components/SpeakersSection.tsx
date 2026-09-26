import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Handshake, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

interface Speaker {
  name: string;
  title: string;
  batch: string;
  category: string;
  description: string;
  image: string;
}

interface SpeakerCarouselProps {
  speakers: Speaker[];
}

// Horizontal, swipeable carousel: 1 card per view on mobile, 2 on tablet, 4 on laptop.
// Pages are derived from the rendered card width so the controls stay correct as speakers are added.
const SpeakerCarousel: React.FC<SpeakerCarouselProps> = ({ speakers }) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [pageCount, setPageCount] = useState(1);
  const [activePage, setActivePage] = useState(0);

  const getMetrics = useCallback(() => {
    const scroller = scrollerRef.current;
    const firstCard = scroller?.firstElementChild;
    if (!scroller || !(firstCard instanceof HTMLElement)) return null;
    const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
    const step = firstCard.offsetWidth + gap;
    const perView = Math.max(1, Math.round((scroller.clientWidth + gap) / step));
    return {
      scroller,
      pageWidth: step * perView,
      maxScroll: scroller.scrollWidth - scroller.clientWidth,
      pages: Math.max(1, Math.ceil(speakers.length / perView)),
    };
  }, [speakers.length]);

  const syncState = useCallback(() => {
    const metrics = getMetrics();
    if (!metrics) return;
    const { scroller, pageWidth, maxScroll, pages } = metrics;
    const atEnd = maxScroll > 0 && scroller.scrollLeft >= maxScroll - 1;
    setPageCount(pages);
    setActivePage(atEnd ? pages - 1 : Math.min(pages - 1, Math.round(scroller.scrollLeft / pageWidth)));
  }, [getMetrics]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    syncState();
    scroller?.addEventListener('scroll', syncState, { passive: true });
    window.addEventListener('resize', syncState);
    return () => {
      scroller?.removeEventListener('scroll', syncState);
      window.removeEventListener('resize', syncState);
    };
  }, [syncState]);

  const scrollToPage = (page: number) => {
    const metrics = getMetrics();
    if (!metrics) return;
    const { scroller, pageWidth, maxScroll, pages } = metrics;
    const target = Math.min(Math.max(page, 0), pages - 1);
    scroller.scrollTo({ left: Math.min(target * pageWidth, maxScroll), behavior: 'smooth' });
  };

  const controlButtonClasses =
    'w-11 h-11 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:bg-white/10 transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5';

  return (
    <div>
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide pb-8 -mb-8"
      >
        {speakers.map((speaker, index) => (
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="snap-start flex-none w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 group"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-primary-600 font-bold text-sm">
                  {speaker.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-white text-sm leading-tight">{speaker.name}</h4>
                <p className="text-white/60 text-xs mt-1 leading-tight">{speaker.title}</p>
              </div>
            </div>

            <div className="flex gap-1 mb-3">
              <span className="px-2 py-0.5 bg-primary-500/20 text-primary-300 text-xs rounded-full">
                {speaker.batch}
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-white/60 text-xs rounded-full">
                {speaker.category}
              </span>
            </div>

            <p className="text-white/50 text-xs leading-relaxed">
              {speaker.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          type="button"
          onClick={() => scrollToPage(activePage - 1)}
          disabled={activePage === 0}
          aria-label="Previous speakers"
          className={controlButtonClasses}
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex items-center gap-2" aria-hidden="true">
          {Array.from({ length: pageCount }, (_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activePage ? 'w-6 bg-primary-400' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollToPage(activePage + 1)}
          disabled={activePage >= pageCount - 1}
          aria-label="Next speakers"
          className={controlButtonClasses}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

const SpeakersSection: React.FC = () => {
  // Function to get partner logo
  const getPartnerLogo = (name: string): string => {
    const logos: { [key: string]: string } = {
      'Y Combinator': '/assets/partners_and_mentors/yc.svg',
      'Khosla Ventures': '/assets/partners_and_mentors/khosla.png',
      'Madrona Venture Group': '/assets/partners_and_mentors/madrona.jpg',
      'Techstars': '/assets/partners_and_mentors/techstars.svg',
      'Pack Ventures': '/assets/partners_and_mentors/pack.jpg',
      'Pillsbury Winthrop Shaw Pittman': '/assets/partners_and_mentors/pillsbury.png',
      'University of Washington': '/assets/partners_and_mentors/uw.jpg',
      '1517 Fund': '/assets/partners_and_mentors/1517.png',
      'Cascade Seed Fund': '/assets/partners_and_mentors/cascade_seed_fund.png',
      'Pioneer Square Labs': '/assets/partners_and_mentors/psl.jpg',
    };
    return logos[name] || '';
  };

  // Featured speakers panel - add new speakers here; order here is display order in the carousel
  const speakers: Speaker[] = [
    {
      name: 'Armon Dadgar',
      title: 'Co-Founder & CTO, HashiCorp (IBM)',
      batch: 'UW Alumni',
      category: 'Infrastructure',
      description: 'Built HashiCorp into a multi-billion dollar infrastructure company (acquired by IBM). Forbes 30 under 30. Created Terraform, Vault, and other foundational DevOps tools used by Fortune 500 companies worldwide.',
      image: '/assets/speakers/armon-dadgar.jpg'
    },
    {
      name: 'Ken Horenstein',
      title: 'Founder & Partner, Pack Ventures',
      batch: 'UW Preferred Partner',
      category: 'UW Ecosystem',
      description: 'Founded Pack Ventures, UW\'s preferred venture partner. Raised $30M second fund to back Husky founders in AI, life sciences, and deep tech. Previously investing at Microsoft M12. Invested in 29 UW-connected startups.',
      image: '/assets/speakers/ken-horenstein.jpg'
    },
    {
      name: 'Vaibhav Gupta',
      title: 'Founder & CEO, Boundary (YC W23)',
      batch: 'Y Combinator',
      category: 'AI Engineering',
      description: 'Building BAML, the programming language for AI agents (6K+ GitHub stars). Previously built AI systems at Google AR, Microsoft HoloLens, and D.E. Shaw. Pioneering structured prompt engineering that saves companies 30% on AI costs.',
      image: '/assets/speakers/vaibhav-gupta.jpg'
    },
    {
      name: 'Steven Green',
      title: 'Partner, Pillsbury Law',
      batch: 'Legal Counsel',
      category: 'Startup Law',
      description: 'Leading startup lawyer for life sciences and biotech companies in Silicon Valley. Advises on formation, fundraising, M&A, and IPOs. Previously partner at Goodwin Procter. University of Chicago Law.',
      image: '/assets/speakers/steven-green.jpg'
    },
    {
      name: 'Oren Etzioni',
      title: 'Founding CEO, Allen Institute for AI (AI2)',
      batch: 'UW Faculty',
      category: 'Artificial Intelligence',
      description: 'Led the Allen Institute for AI from its founding into a world-leading research lab. UW computer science professor emeritus and serial founder of Farecast (acquired by Microsoft) and Decide.com (acquired by eBay). Venture partner at Madrona and founder of TrueMedia.org.',
      image: '/assets/speakers/oren-etzioni.jpg'
    }
  ];

  const partners = [
    { name: 'Pack Ventures', category: 'Venture Capital', isSponsor: true },
    { name: 'Pillsbury Winthrop Shaw Pittman', category: 'Legal Partner', isSponsor: true },
    { name: 'Y Combinator', category: 'Accelerator', isSponsor: false },
    { name: 'Khosla Ventures', category: 'Venture Capital', isSponsor: false },
    { name: 'Madrona Venture Group', category: 'Venture Capital', isSponsor: false },
    { name: 'Techstars', category: 'Accelerator', isSponsor: false },
    { name: '1517 Fund', category: 'Venture Capital', isSponsor: false },
    { name: 'Cascade Seed Fund', category: 'Venture Capital', isSponsor: false },
    { name: 'Pioneer Square Labs', category: 'Startup Studio', isSponsor: false },
    { name: 'University of Washington', category: 'Academic Partner', isSponsor: false },
  ];

  const categories = [
    { icon: Users, label: 'Venture Capital', count: '5+ VCs' },
    { icon: Award, label: 'Founders', count: '6+ CEOs' },
    { icon: Handshake, label: 'Partners', count: '7+ Orgs' },
    { icon: Globe, label: 'UW Network', count: '50+ Alumni' }
  ];


  return (
    <section className="bg-charcoal py-section px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="overline text-pink mb-6">OUR NETWORK</div>
          <h2 className="section-title text-white mb-6">Speakers, Mentors & Partners</h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Learn from industry legends, partner with leading organizations, and connect with transformational leaders
            who support our community across every batch.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <category.icon className="text-white" size={20} />
              </div>
              <h3 className="text-white font-medium text-xs mb-1">{category.label}</h3>
              <p className="text-white/60 text-xs">{category.count}</p>
            </motion.div>
          ))}
        </div>

        {/* Speakers Carousel - cards come from the `speakers` array above */}
        <div className="mb-12">
          <h3 className="text-white text-2xl font-semibold mb-6">Featured Speakers & Mentors</h3>
          <SpeakerCarousel speakers={speakers} />
        </div>

        {/* Partners Grid */}
        <div>
          <h3 className="text-white text-2xl font-semibold mb-2">Hosted VCs and Founders From</h3>
          <p className="text-white/50 text-sm mb-6">The ecosystem behind our speakers, mentors, and community</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`relative backdrop-blur-sm rounded-xl p-4 transition-all duration-300 group text-center ${
                  partner.isSponsor
                    ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/15 border border-primary-400/40 hover:border-primary-400/70 hover:bg-primary-500/25'
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                {partner.isSponsor && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-[10px] font-bold rounded-full uppercase tracking-wide whitespace-nowrap">
                    Sponsor
                  </span>
                )}
                <div className={`w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-3 p-3 transition-all duration-300 border ${
                  partner.isSponsor
                    ? 'bg-white/20 border-white/30 group-hover:bg-white/25'
                    : 'bg-white/10 border-white/20 group-hover:bg-white/15'
                }`}>
                  {getPartnerLogo(partner.name) ? (
                    <img
                      src={getPartnerLogo(partner.name)}
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <span className="text-white font-bold text-sm">
                      {partner.name.split(' ').map(word => word[0]).join('').substring(0, 2)}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1 leading-tight">{partner.name}</h4>
                <span className={`px-2 py-0.5 text-xs rounded-full inline-block ${
                  partner.isSponsor
                    ? 'bg-primary-500/30 text-primary-200'
                    : 'bg-accent-500/20 text-accent-300'
                }`}>
                  {partner.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SpeakersSection;
