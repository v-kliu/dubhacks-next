import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Building, Linkedin } from 'lucide-react';
import Footer from './Footer';

interface Founder {
  name: string;
  company: string;
  batch: string;
  graduationYear: string;
  major: string;
  linkedIn?: string;
}

const FounderDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('all');

  // TO ADD/EDIT FOUNDERS:
  // See founder_directory_data.txt for easy-to-use templates and instructions
  // Copy entries from that file and paste them here
  const founders: Founder[] = [
    {
      name: 'Alex Chen',
      company: 'vly.com',
      batch: 'Batch 3',
      graduationYear: '2022',
      major: 'Computer Science',
      linkedIn: 'https://linkedin.com/in/alexchen'
    },
    {
      name: 'Sarah Kim',
      company: 'Meteor',
      batch: 'Batch 4',
      graduationYear: '2023',
      major: 'Human-Computer Interaction',
      linkedIn: 'https://linkedin.com/in/sarahkim'
    },
    {
      name: 'David Rodriguez',
      company: 'Koel Labs',
      batch: 'Batch 4',
      graduationYear: '2023',
      major: 'Electrical Engineering (PhD)',
      linkedIn: 'https://linkedin.com/in/davidrodriguez'
    },
    {
      name: 'Emma Thompson',
      company: 'Ripple',
      batch: 'Batch 4',
      graduationYear: '2024',
      major: 'Business Administration',
      linkedIn: 'https://linkedin.com/in/emmathompson'
    },
    {
      name: 'Michael Wang',
      company: 'Soarin',
      batch: 'Batch 4',
      graduationYear: '2024',
      major: 'Data Science',
      linkedIn: 'https://linkedin.com/in/michaelwang'
    },
    {
      name: 'Lisa Park',
      company: 'vly.com',
      batch: 'Batch 3',
      graduationYear: '2022',
      major: 'Design',
      linkedIn: 'https://linkedin.com/in/lisapark'
    }
  ];

  const filteredFounders = founders.filter(founder => {
    const matchesSearch = founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         founder.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         founder.major.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || founder.batch === selectedBatch;

    return matchesSearch && matchesBatch;
  });

  const batches = ['all', 'Batch 3', 'Batch 4'];

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
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFounders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Founder Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold text-xl">
                    {founder.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-neutral-900">{founder.name}</h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-sm text-primary-600 font-medium">{founder.company}</span>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                      {founder.batch}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-neutral-600 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar size={14} className="text-neutral-400" />
                  <span>Graduated {founder.graduationYear}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-neutral-400">📚</span>
                  <span>{founder.major}</span>
                </div>
              </div>

              {/* LinkedIn Link */}
              {founder.linkedIn && (
                <a
                  href={founder.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 text-sm pt-3 border-t border-neutral-100"
                >
                  <Linkedin size={16} />
                  <span>View LinkedIn</span>
                </a>
              )}
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