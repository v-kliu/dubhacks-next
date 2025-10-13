import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Users } from 'lucide-react';
import Footer from './Footer';

interface Startup {
  name: string;
  tagline: string;
  description: string;
  batch: string;
  founded: string;
  website: string;
  stage: string;
  teamSize: string;
}

const StartupDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [selectedStage, setSelectedStage] = useState('all');

  // TO ADD/EDIT STARTUPS:
  // See startup_directory_data.txt for easy-to-use templates and instructions
  // Copy entries from that file and paste them here
  const startups: Startup[] = [
    {
      name: 'vly.com',
      tagline: 'The world\'s best AI web app builder',
      description: 'Building the future of web development with AI-powered tools that make creating applications accessible to everyone.',
      batch: 'Batch 3',
      founded: '2023',
      website: 'https://vly.com',
      stage: 'Seed',
      teamSize: '8'
    },
    {
      name: 'Meteor',
      tagline: 'A browser that can do work on your behalf',
      description: 'Revolutionary browser technology that automates workflows and handles tasks intelligently on behalf of users.',
      batch: 'Batch 4',
      founded: '2023',
      website: 'https://meteor.com',
      stage: 'Seed',
      teamSize: '12'
    },
    {
      name: 'Koel Labs',
      tagline: 'Speech Technology for Anyone Built by Everyone',
      description: 'Democratizing speech technology through open-source tools and accessible APIs for developers worldwide.',
      batch: 'Batch 4',
      founded: '2023',
      website: 'https://koellabs.com',
      stage: 'Pre-Seed',
      teamSize: '6'
    },
    {
      name: 'Ripple',
      tagline: 'The first hyperlocal marketplace built by and for college students',
      description: 'Connecting college students with local services, goods, and opportunities in their campus communities.',
      batch: 'Batch 4',
      founded: '2024',
      website: 'https://ripple.com',
      stage: 'Pre-Seed',
      teamSize: '4'
    },
    {
      name: 'Soarin',
      tagline: 'Building professional identities from preexisting data',
      description: 'Helping professionals showcase their achievements and build compelling digital identities using their existing data.',
      batch: 'Batch 4',
      founded: '2024',
      website: 'https://soarin.com',
      stage: 'Pre-Seed',
      teamSize: '3'
    }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || startup.batch === selectedBatch;
    const matchesStage = selectedStage === 'all' || startup.stage === selectedStage;

    return matchesSearch && matchesBatch && matchesStage;
  });

  const batches = ['all', 'Batch 3', 'Batch 4'];
  const stages = ['all', 'Pre-Seed', 'Seed'];

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
            <h1 className="text-4xl font-light text-neutral-900 mb-4">Startup Directory</h1>
            <p className="text-neutral-600 text-lg">
              Discover startups built by DubHacks Next alumni. {startups.length} companies and counting.
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
                placeholder="Search startups..."
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
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {stages.map(stage => (
                  <option key={stage} value={stage}>
                    {stage === 'all' ? 'All Stages' : stage}
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
          {filteredStartups.map((startup, index) => (
            <motion.div
              key={startup.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-accent-100 rounded-lg flex items-center justify-center">
                    <span className="text-primary-600 font-bold text-lg">
                      {startup.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{startup.name}</h3>
                    <p className="text-sm text-neutral-500">{startup.batch}</p>
                  </div>
                </div>
              </div>

              {/* Tagline */}
              <p className="text-neutral-700 font-medium mb-3">{startup.tagline}</p>

              {/* Description */}
              <p className="text-neutral-600 text-sm mb-4 line-clamp-3">{startup.description}</p>

              {/* Metadata */}
              <div className="space-y-2 text-sm text-neutral-600 mb-4 pt-4 border-t border-neutral-100">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-neutral-400" />
                  <span>Founded {startup.founded}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users size={14} className="text-neutral-400" />
                  <span>{startup.teamSize} people • {startup.stage}</span>
                </div>
              </div>

              {/* Website Link */}
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700 text-sm font-medium inline-flex items-center space-x-1"
              >
                <span>Visit Website</span>
                <span>→</span>
              </a>
            </motion.div>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500 text-lg">No startups found matching your criteria.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default StartupDirectory;