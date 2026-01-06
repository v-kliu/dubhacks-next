import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Users, Calendar } from 'lucide-react';

interface Startup {
  name: string;
  tagline: string;
  description: string;
  batch: string;
  founded: string;
  website: string;
  stage: string;
  founders: string[];
}

const StartupDirectory: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);

  // Function to get batch-specific gradient colors
  const getBatchGradient = (batch: string): string => {
    const batchGradients: { [key: string]: string } = {
      'Batch 1': 'from-purple-400 to-purple-600',
      'Batch 2': 'from-green-400 to-green-600',
      'Batch 3': 'from-blue-400 to-blue-600',
      'Batch 4': 'from-orange-400 to-orange-600',
    };
    return batchGradients[batch] || 'from-neutral-400 to-neutral-600';
  };

  // Function to get stage-specific colors
  const getStageColor = (stage: string): string => {
    const stageColors: { [key: string]: string } = {
      'Pre-Seed': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Seed': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Series A': 'bg-cyan-50 text-cyan-700 border-cyan-200',
      'Series B+': 'bg-violet-50 text-violet-700 border-violet-200',
    };
    return stageColors[stage] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  // Parse startups from text file
  const parseStartups = (data: string): Startup[] => {
    const startupsList: Startup[] = [];
    const entries = data.split(/(?=\n\{)/);

    entries.forEach(entry => {
      if (!entry.includes('name:') || entry.includes('TEMPLATE:')) return;

      try {
        const nameMatch = entry.match(/name:\s*['"]([^'"]+)['"]/);
        const taglineMatch = entry.match(/tagline:\s*['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/);
        const descriptionMatch = entry.match(/description:\s*['"]([^'"]+)['"]/);
        const batchMatch = entry.match(/batch:\s*['"]([^'"]+)['"]/);
        const foundedMatch = entry.match(/founded:\s*['"]([^'"]+)['"]/);
        const websiteMatch = entry.match(/website:\s*['"]([^'"]+)['"]/);
        const stageMatch = entry.match(/stage:\s*['"]([^'"]+)['"]/);
        const foundersMatch = entry.match(/founders:\s*\[([^\]]+)\]/);

        if (nameMatch && taglineMatch && descriptionMatch && batchMatch && websiteMatch && stageMatch) {
          let foundersList: string[] = [];

          if (foundersMatch) {
            foundersList = foundersMatch[1]
              .split(',')
              .map(f => f.trim().replace(/['"]/g, ''))
              .filter(f => f.length > 0);
          }

          startupsList.push({
            name: nameMatch[1],
            tagline: taglineMatch[1],
            description: descriptionMatch[1],
            batch: batchMatch[1],
            founded: foundedMatch ? foundedMatch[1] : '',
            website: websiteMatch[1],
            stage: stageMatch[1],
            founders: foundersList
          });
        }
      } catch (error) {
        console.error('Error parsing startup entry:', error);
      }
    });

    return startupsList;
  };

  // Load data from text file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/startup_directory_data.txt');
        const text = await response.text();
        setStartups(parseStartups(text));
      } catch (error) {
        console.error('Error loading startup data:', error);
      }
    };

    loadData();
  }, []);


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="grid-overlay absolute inset-0 w-full h-full" style={{ minHeight: '100%', height: 'auto' }}></div>

      {/* Header */}
      <div className="relative pt-28 pb-12 px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-light text-neutral-900 mb-6">
              Startup Directory
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto">
              Discover innovative startups built by DubHacks Next alumni. 
            </p>
          </motion.div>
        </div>
      </div>

      {/* Results */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {startups.map((startup, index) => (
            <motion.div
              key={startup.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl border-2 border-primary-200 shadow-lg shadow-primary-500/10 overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-1 h-full flex flex-col">
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${getBatchGradient(startup.batch)}`}></div>

                <div className="p-8 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getBatchGradient(startup.batch)} flex items-center justify-center shadow-md`}>
                          <span className="text-white font-bold text-xl">
                            {startup.name.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold text-neutral-900">
                          {startup.name}
                        </h3>
                      </div>

                      {/* Badges */}
                      <div className="flex items-center gap-2 flex-wrap mb-4">
                        <span className="px-3 py-1 text-xs rounded-full font-medium bg-primary-50 text-primary-700 border border-primary-200">
                          {startup.batch}
                        </span>
                        <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getStageColor(startup.stage)}`}>
                          {startup.stage}
                        </span>
                        {startup.founded && (
                          <span className="px-3 py-1 text-xs rounded-full font-medium bg-neutral-50 text-neutral-600 border border-neutral-200 flex items-center gap-1">
                            <Calendar size={12} />
                            {startup.founded}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-lg font-semibold text-primary-600 mb-3">
                    {startup.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-neutral-600 mb-6 flex-1">
                    {startup.description}
                  </p>

                  {/* Founders */}
                  {startup.founders && startup.founders.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-neutral-100">
                      <div className="flex items-center gap-2 mb-3">
                        <Users size={16} className="text-neutral-400" />
                        <span className="text-sm text-neutral-600 font-medium">Founders</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {startup.founders.map((founder, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 text-sm rounded-lg font-medium bg-neutral-50 text-neutral-700 border border-neutral-200"
                          >
                            {founder}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Website Link */}
                  <div className="mt-auto">
                    <a
                      href={startup.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105"
                    >
                      <span>Visit Website</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default StartupDirectory;
