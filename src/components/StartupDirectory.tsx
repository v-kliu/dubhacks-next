import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, ArrowUpRight } from 'lucide-react';

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
  const [selectedBatch, setSelectedBatch] = useState<string>('All');

  const batches = ['All', 'Batch 4', 'Batch 3', 'Batch 2', 'Batch 1'];

  const filteredStartups = selectedBatch === 'All'
    ? startups
    : startups.filter(s => s.batch === selectedBatch);

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
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary-400 text-sm font-medium tracking-wider uppercase mb-4">
              Portfolio
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Startup Directory
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              Companies built by founders in the DubHacks Next program.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            {batches.map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selectedBatch === batch
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {batch}
              </button>
            ))}
            <div className="ml-auto text-sm text-neutral-500">
              {filteredStartups.length} {filteredStartups.length === 1 ? 'company' : 'companies'}
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStartups.map((startup, index) => (
            <motion.article
              key={startup.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <a
                href={startup.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-neutral-200 rounded-xl p-6 h-full transition-all duration-200 hover:border-neutral-300 hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-semibold text-neutral-900 truncate">
                        {startup.name}
                      </h2>
                      <ArrowUpRight
                        size={18}
                        className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      />
                    </div>
                    <p className="text-primary-600 font-medium text-sm">
                      {startup.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600 text-sm leading-relaxed mb-5 line-clamp-3">
                  {startup.description}
                </p>

                {/* Founders */}
                {startup.founders && startup.founders.length > 0 && (
                  <div className="mb-5">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
                      <Users size={12} />
                      <span>Founded by</span>
                    </div>
                    <p className="text-sm text-neutral-700">
                      {startup.founders.join(', ')}
                    </p>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                    {startup.batch}
                  </span>
                  <span className="text-xs font-medium text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded">
                    {startup.stage}
                  </span>
                  {startup.founded && (
                    <span className="text-xs text-neutral-400 flex items-center gap-1 ml-auto">
                      <Calendar size={12} />
                      {startup.founded}
                    </span>
                  )}
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">No startups found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupDirectory;
