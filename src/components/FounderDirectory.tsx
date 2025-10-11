import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, Calendar, Building, Linkedin, Mail } from 'lucide-react';
import Footer from './Footer';

interface Founder {
  id: string;
  name: string;
  title: string;
  company: string;
  batch: string;
  location: string;
  bio: string;
  expertise: string[];
  previousCompanies?: string[];
  linkedIn?: string;
  email?: string;
  graduationYear: string;
  major: string;
  image?: string;
}

const FounderDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedExpertise, setSelectedExpertise] = useState('all');

  const founders: Founder[] = [
    {
      id: '1',
      name: 'Alex Chen',
      title: 'Co-Founder & CEO',
      company: 'vly.com',
      batch: 'Batch 3',
      location: 'Seattle, WA',
      bio: 'Building the future of web development with AI. Previously worked at Microsoft and Google on developer tools.',
      expertise: ['AI/ML', 'Web Development', 'Product Management', 'B2B SaaS'],
      previousCompanies: ['Microsoft', 'Google'],
      graduationYear: '2022',
      major: 'Computer Science',
      linkedIn: 'https://linkedin.com/in/alexchen',
      email: 'alex@vly.com'
    },
    {
      id: '2',
      name: 'Sarah Kim',
      title: 'Founder & CEO',
      company: 'Meteor',
      batch: 'Batch 4',
      location: 'Seattle, WA',
      bio: 'Reimagining how people interact with the web through intelligent automation. Former PM at Meta.',
      expertise: ['Browser Technology', 'Automation', 'UX Design', 'B2C'],
      previousCompanies: ['Meta', 'Stripe'],
      graduationYear: '2023',
      major: 'Human-Computer Interaction',
      linkedIn: 'https://linkedin.com/in/sarahkim',
      email: 'sarah@meteor.com'
    },
    {
      id: '3',
      name: 'David Rodriguez',
      title: 'Co-Founder & CTO',
      company: 'Koel Labs',
      batch: 'Batch 4',
      location: 'Seattle, WA',
      bio: 'Passionate about democratizing speech technology. PhD in Speech Processing from UW.',
      expertise: ['Speech Technology', 'AI/ML', 'Open Source', 'Research'],
      previousCompanies: ['Amazon Alexa', 'Nuance'],
      graduationYear: '2023',
      major: 'Electrical Engineering (PhD)',
      linkedIn: 'https://linkedin.com/in/davidrodriguez',
      email: 'david@koellabs.com'
    },
    {
      id: '4',
      name: 'Emma Thompson',
      title: 'Founder & CEO',
      company: 'Ripple',
      batch: 'Batch 4',
      location: 'Seattle, WA',
      bio: 'Building hyperlocal communities for college students. Former student body president at UW.',
      expertise: ['Marketplace', 'Community Building', 'Mobile Apps', 'Student Life'],
      graduationYear: '2024',
      major: 'Business Administration',
      linkedIn: 'https://linkedin.com/in/emmathompson',
      email: 'emma@ripple.com'
    },
    {
      id: '5',
      name: 'Michael Wang',
      title: 'Co-Founder & CEO',
      company: 'Soarin',
      batch: 'Batch 4',
      location: 'Seattle, WA',
      bio: 'Helping professionals build better digital identities. Data science background with focus on professional networks.',
      expertise: ['Data Science', 'Professional Networks', 'Career Development', 'Analytics'],
      previousCompanies: ['LinkedIn', 'Indeed'],
      graduationYear: '2024',
      major: 'Data Science',
      linkedIn: 'https://linkedin.com/in/michaelwang',
      email: 'michael@soarin.com'
    },
    {
      id: '6',
      name: 'Lisa Park',
      title: 'Co-Founder & CPO',
      company: 'vly.com',
      batch: 'Batch 3',
      location: 'Seattle, WA',
      bio: 'Product leader focused on developer experience and AI-powered tools. Former design lead at Figma.',
      expertise: ['Product Design', 'Developer Experience', 'AI/ML', 'User Research'],
      previousCompanies: ['Figma', 'Adobe'],
      graduationYear: '2022',
      major: 'Design',
      linkedIn: 'https://linkedin.com/in/lisapark',
      email: 'lisa@vly.com'
    }
  ];

  const filteredFounders = founders.filter(founder => {
    const matchesSearch = founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         founder.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         founder.expertise.some(exp => exp.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         founder.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || founder.batch === selectedBatch;
    const matchesExpertise = selectedExpertise === 'all' || founder.expertise.includes(selectedExpertise);
    
    return matchesSearch && matchesBatch && matchesExpertise;
  });

  const batches = ['all', 'Batch 3', 'Batch 4'];
  const expertiseAreas = ['all', 'AI/ML', 'Product Management', 'Engineering', 'Design', 'Data Science', 'Marketing'];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-light text-neutral-900 mb-4">Founder Directory</h1>
            <p className="text-neutral-600 text-lg">
              Connect with founders from the DubHacks Next community. {founders.length} alumni and counting.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search founders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-3 items-center">
              <Filter size={20} className="text-neutral-500" />
              
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {batches.map(batch => (
                  <option key={batch} value={batch}>
                    {batch === 'all' ? 'All Batches' : batch}
                  </option>
                ))}
              </select>

              <select
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {expertiseAreas.map(area => (
                  <option key={area} value={area}>
                    {area === 'all' ? 'All Expertise' : area}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFounders.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              {/* Founder Header - Always Visible */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-xl">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900 truncate">{founder.name}</h3>
                  <p className="text-sm text-neutral-600 truncate">{founder.title}</p>
                  <p className="text-sm text-primary-600 font-medium">{founder.company}</p>
                </div>
              </div>

              {/* Bio - Show on Hover */}
              <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-20 group-hover:mb-4">
                <p className="text-neutral-600 text-sm line-clamp-3">{founder.bio}</p>
              </div>

              {/* Expertise Tags - Show on Hover */}
              <div className="flex flex-wrap gap-2 mb-0 group-hover:mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-10 overflow-hidden">
                {founder.expertise.slice(0, 3).map(skill => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {founder.expertise.length > 3 && (
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    +{founder.expertise.length - 3}
                  </span>
                )}
              </div>

              {/* Metadata - Show on Hover */}
              <div className="grid grid-cols-1 gap-2 text-xs text-neutral-500 mb-0 group-hover:mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-16 overflow-hidden">
                <div className="flex items-center space-x-1">
                  <Building size={12} />
                  <span>{founder.batch} • {founder.major}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={12} />
                  <span>{founder.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar size={12} />
                  <span>Graduated {founder.graduationYear}</span>
                </div>
              </div>

              {/* Contact Links - Show on Hover */}
              <div className="flex items-center space-x-3 pt-0 group-hover:pt-3 border-t-0 group-hover:border-t border-neutral-100 opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-10 overflow-hidden">
                {founder.linkedIn && (
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Linkedin size={14} />
                    <span>LinkedIn</span>
                  </a>
                )}
                {founder.email && (
                  <a
                    href={`mailto:${founder.email}`}
                    className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Mail size={14} />
                    <span>Email</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredFounders.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">No founders found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default FounderDirectory;