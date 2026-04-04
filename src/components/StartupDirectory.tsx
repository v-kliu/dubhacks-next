import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, ArrowUpRight } from 'lucide-react';

interface Startup {
  name: string;
  tagline?: string;
  description?: string;
  batch: string;
  founded?: string;
  website?: string;
  stage?: string;
  founders: string[];
}

const StartupDirectory: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('All');

  const batches = ['All', 'Batch 5', 'Batch 4', 'Batch 3', 'Batch 2', 'Batch 1'];
  const batchOrder = ['Batch 5', 'Batch 4', 'Batch 3', 'Batch 2', 'Batch 1'];

  const filteredStartups = selectedBatch === 'All'
    ? startups
    : startups.filter(s => s.batch === selectedBatch);

  const groupedStartups = filteredStartups.reduce((acc, startup) => {
    if (!acc[startup.batch]) acc[startup.batch] = [];
    acc[startup.batch].push(startup);
    return acc;
  }, {} as Record<string, Startup[]>);

  const parseStartups = (data: string): Startup[] => {
    const list: Startup[] = [];
    const entries = data.split(/(?=\n\{)/);

    entries.forEach(entry => {
      if (!entry.includes('name:') || entry.includes('TEMPLATE:')) return;
      try {
        const nameMatch = entry.match(/name:\s*['"]([^'"]+)['"]/);
        const batchMatch = entry.match(/batch:\s*['"]([^'"]+)['"]/);
        if (!nameMatch || !batchMatch) return;

        const foundersMatch = entry.match(/founders:\s*\[([^\]]+)\]/);
        const foundersList = foundersMatch
          ? foundersMatch[1].split(',').map(f => f.trim().replace(/['"]/g, '')).filter(Boolean)
          : [];

        list.push({
          name: nameMatch[1],
          batch: batchMatch[1],
          tagline: entry.match(/tagline:\s*['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/)?.[1],
          description: entry.match(/description:\s*['"]([^'"]+)['"]/)?.[1],
          founded: entry.match(/founded:\s*['"]([^'"]+)['"]/)?.[1],
          website: entry.match(/website:\s*['"]([^'"]+)['"]/)?.[1],
          stage: entry.match(/stage:\s*['"]([^'"]+)['"]/)?.[1],
          founders: foundersList,
        });
      } catch (e) {
        console.error('Error parsing startup entry:', e);
      }
    });

    return list;
  };

  useEffect(() => {
    fetch('/startup_directory_data.txt')
      .then(r => r.text())
      .then(text => setStartups(parseStartups(text)))
      .catch(e => console.error('Error loading startup data:', e));
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
              Companies spun up and built by our founders.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {batches.map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  selectedBatch === batch
                    ? 'bg-black text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {batch}
              </button>
            ))}
            <span className="ml-auto text-sm text-neutral-400 whitespace-nowrap">
              {filteredStartups.length} {filteredStartups.length === 1 ? 'company' : 'companies'}
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {batchOrder.map(batch => {
          const batchStartups = groupedStartups[batch];
          if (!batchStartups || batchStartups.length === 0) return null;

          return (
            <motion.section
              key={batch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-14 last:mb-0"
            >
              {/* Batch Header */}
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-semibold text-neutral-900">{batch}</h2>
                <div className="flex-1 h-px bg-neutral-200" />
                <span className="text-xs text-neutral-400">
                  {batchStartups.length} {batchStartups.length === 1 ? 'company' : 'companies'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {batchStartups.map((startup, index) => {
                  const hasWebsite = !!startup.website;
                  const CardWrapper = hasWebsite ? 'a' : 'div';
                  const cardProps = hasWebsite ? {
                    href: startup.website,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  } : {};

                  return (
                    <motion.article
                      key={startup.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                      className="group"
                    >
                      <CardWrapper
                        {...(cardProps as any)}
                        className={`block bg-white border border-neutral-200 rounded-xl p-6 h-full transition-all duration-200 ${
                          hasWebsite ? 'hover:border-neutral-300 hover:shadow-lg' : ''
                        }`}
                      >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-semibold text-neutral-900 truncate">
                                {startup.name}
                              </h3>
                              {hasWebsite && (
                                <ArrowUpRight
                                  size={18}
                                  className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                                />
                              )}
                            </div>
                            {startup.tagline && (
                              <p className="text-primary-600 font-medium text-sm">
                                {startup.tagline}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        {startup.description && (
                          <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                            {startup.description}
                          </p>
                        )}

                        {/* Founders */}
                        {startup.founders.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1.5">
                              <Users size={12} />
                              <span>Founded by</span>
                            </div>
                            <p className="text-sm text-neutral-700">
                              {startup.founders.join(', ')}
                            </p>
                          </div>
                        )}

                        {/* Meta */}
                        {startup.founded && (
                          <div className="flex items-center pt-3 border-t border-neutral-100">
                            <span className="text-xs text-neutral-400 flex items-center gap-1 ml-auto">
                              <Calendar size={12} />
                              {startup.founded}
                            </span>
                          </div>
                        )}
                      </CardWrapper>
                    </motion.article>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

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
