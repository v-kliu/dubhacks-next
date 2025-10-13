import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building, Users, Star, Handshake, Globe } from 'lucide-react';

const SpeakersSection: React.FC = () => {
  // Function to get partner logo
  const getPartnerLogo = (name: string): string => {
    const logos: { [key: string]: string } = {
      'Y Combinator': '/assets/partners_and_mentors/yc.svg',
      'Khosla Ventures': '/assets/partners_and_mentors/khosla.png',
      'Madrona Venture Group': '/assets/partners_and_mentors/madrona.jpg',
      'Techstars': '/assets/partners_and_mentors/techstars.svg',
      'Pack Ventures': '/assets/partners_and_mentors/pack.jpg',
      'University of Washington': '/assets/partners_and_mentors/uw.jpg',
      'Amazon Web Services': '/assets/partners_and_mentors/aws.svg',
    };
    return logos[name] || '';
  };

  // Speakers ranked by impressiveness (achievements, company impact, credentials)
  const speakers = [
    {
      name: 'Armon Dadgar',
      title: 'Co-Founder & CTO, HashiCorp (IBM)',
      batch: 'UW Alumni',
      category: 'Infrastructure',
      description: 'Built HashiCorp into a multi-billion dollar infrastructure company (acquired by IBM). Forbes 30 under 30. Created Terraform, Vault, and other foundational DevOps tools used by Fortune 500 companies worldwide.',
      image: '/assets/speakers/armon-dadgar.jpg'
    },
    {
      name: 'Jon Chu',
      title: 'Partner, Khosla Ventures',
      batch: 'Venture Capital',
      category: 'AI & Infrastructure',
      description: 'Early engineer at Palantir (scaled 200→1800 employees). Founded and sold KoalityCode to Docker, led Docker Enterprise. Angel investor in Figma, Ollama, StackRox. Invests in cutting-edge AI infrastructure and developer tools.',
      image: '/assets/speakers/jon-chu.jpg'
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
      name: 'Prem Kumar',
      title: 'Co-Founder & CEO, Humanly.io',
      batch: 'GeekWire CEO of Year',
      category: 'HR Tech & AI',
      description: 'GeekWire 2023 Startup CEO of the Year. Built AI hiring platform (raised $5.5M). 10 years at Microsoft leading HR technology initiatives. PSBJ 40 under 40. Former product leader at TINYpulse.',
      image: '/assets/speakers/prem-kumar.jpg'
    },
    {
      name: 'Avi Geiger',
      title: 'Founder & CEO, Groundlight AI',
      batch: 'Madrona-Backed',
      category: 'Computer Vision',
      description: 'Building enterprise computer vision that works day one. 12 years as Principal Architect at Microsoft. Co-founder/CTO of Picobrew. Backed by Madrona and Greycroft. CB Insights Top 100 AI Company.',
      image: '/assets/speakers/avi-geiger.jpg'
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
      name: 'Sam Dore',
      title: 'Head of Talent, Madrona Venture Labs',
      batch: 'Startup Studio',
      category: 'Talent & Recruiting',
      description: 'Builds winning teams for enterprise AI startups at Madrona Venture Labs. Partners with founders from day one to scale companies. Expertise in early-stage recruitment and founder team building.',
      image: '/assets/speakers/sam-dore.jpg'
    },
    {
      name: 'Steven Green',
      title: 'Partner, Pillsbury Law',
      batch: 'Legal Counsel',
      category: 'Startup Law',
      description: 'Leading startup lawyer for life sciences and biotech companies in Silicon Valley. Advises on formation, fundraising, M&A, and IPOs. Previously partner at Goodwin Procter. University of Chicago Law.',
      image: '/assets/speakers/steven-green.jpg'
    }
  ];

  const partners = [
    // Top-tier VC firms and accelerators
    { name: 'Y Combinator', category: 'Accelerator' },
    { name: 'Khosla Ventures', category: 'Venture Capital' },
    { name: 'Madrona Venture Group', category: 'Venture Capital' },
    { name: 'Techstars', category: 'Accelerator' },
    { name: 'Pack Ventures', category: 'Venture Capital' },
    { name: 'University of Washington', category: 'Academic Partner' },
    { name: 'Amazon Web Services', category: 'Cloud Platform' },
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

        {/* Speakers Grid - 4 per row on large screens, more compact */}
        <div className="mb-12">
          <h3 className="text-white text-2xl font-semibold mb-6">Featured Speakers & Mentors</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
              <motion.div
                key={`speaker-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all duration-300 group"
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
        </div>

        {/* Partners Grid - 5 per row, more compact */}
        <div>
          <h3 className="text-white text-2xl font-semibold mb-6">Partners & Ecosystem</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {partners.map((partner, index) => (
              <motion.div
                key={`partner-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group text-center"
              >
                <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 p-3 group-hover:bg-white/15 transition-all duration-300 border border-white/20">
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
                <span className="px-2 py-0.5 bg-accent-500/20 text-accent-300 text-xs rounded-full inline-block">
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
