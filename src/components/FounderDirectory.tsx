import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase } from 'lucide-react';

interface Founder {
  name: string;
  company: string;
  batch: string;
  projectLink?: string;
  currentOccupation?: string;
}

const FounderDirectory: React.FC = () => {
  const [founders, setFounders] = useState<Founder[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('All');

  const batches = ['All', 'Batch 4', 'Batch 3', 'Batch 2', 'Batch 1', 'Batch 0'];

  const filteredFounders = selectedBatch === 'All'
    ? founders
    : founders.filter(f => f.batch === selectedBatch);

  // Group founders by batch for display
  const groupedFounders = filteredFounders.reduce((acc, founder) => {
    if (!acc[founder.batch]) {
      acc[founder.batch] = [];
    }
    acc[founder.batch].push(founder);
    return acc;
  }, {} as Record<string, Founder[]>);

  const batchOrder = ['Batch 4', 'Batch 3', 'Batch 2', 'Batch 1', 'Batch 0'];

  // Parse founders from text file
  const parseFounders = (data: string): Founder[] => {
    const foundersList: Founder[] = [];
    const entries = data.split(/(?=\n\{)/);

    entries.forEach(entry => {
      if (!entry.includes('name:') || entry.includes('TEMPLATE:')) return;

      try {
        const nameMatch = entry.match(/name:\s*['"]([^'"]+)['"]/);
        const companyMatch = entry.match(/company:\s*['"]([^'"]+)['"]/);
        const batchMatch = entry.match(/batch:\s*['"]([^'"]+)['"]/);
        const projectLinkMatch = entry.match(/projectLink:\s*['"]([^'"]+)['"]/);
        const currentOccupationMatch = entry.match(/currentOccupation:\s*['"]([^'"]+)['"]/);

        if (nameMatch && companyMatch && batchMatch) {
          foundersList.push({
            name: nameMatch[1],
            company: companyMatch[1],
            batch: batchMatch[1],
            projectLink: projectLinkMatch ? projectLinkMatch[1] : undefined,
            currentOccupation: currentOccupationMatch ? currentOccupationMatch[1] : undefined
          });
        }
      } catch (error) {
        console.error('Error parsing founder entry:', error);
      }
    });

    return foundersList;
  };

  // Load data from text file
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/founder_directory_data.txt');
        const text = await response.text();
        setFounders(parseFounders(text));
      } catch (error) {
        console.error('Error loading founder data:', error);
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
              Community
            </p>
            <h1 className="text-4xl md:text-5xl font-semibold mb-4">
              Founder Directory
            </h1>
            <p className="text-neutral-400 text-lg max-w-xl">
              The talented founders who have been part of DubHacks Next.
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
              {filteredFounders.length} {filteredFounders.length === 1 ? 'founder' : 'founders'}
            </div>
          </div>
        </div>
      </div>

      {/* Results - Grouped by Batch */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {batchOrder.map(batch => {
          const batchFounders = groupedFounders[batch];
          if (!batchFounders || batchFounders.length === 0) return null;

          return (
            <motion.section
              key={batch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16 last:mb-0"
            >
              {/* Batch Header */}
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-2xl font-semibold text-neutral-900">
                  {batch}
                </h2>
                <div className="flex-1 h-px bg-neutral-200"></div>
                <span className="text-sm text-neutral-500">
                  {batchFounders.length} {batchFounders.length === 1 ? 'founder' : 'founders'}
                </span>
              </div>

              {/* Founders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {batchFounders.map((founder, index) => {
                  const hasLink = founder.projectLink && founder.projectLink !== 'N/A';
                  const CardWrapper = hasLink ? 'a' : 'div';
                  const cardProps = hasLink ? {
                    href: founder.projectLink,
                    target: "_blank",
                    rel: "noopener noreferrer"
                  } : {};

                  return (
                    <motion.div
                      key={`${founder.name}-${index}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <CardWrapper
                        {...cardProps}
                        className={`block bg-white border border-neutral-200 rounded-xl p-5 h-full transition-all duration-200 ${
                          hasLink ? 'hover:border-neutral-300 hover:shadow-md group cursor-pointer' : ''
                        }`}
                      >
                        {/* Name & Link */}
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-base font-semibold text-neutral-900">
                            {founder.name}
                          </h3>
                          {hasLink && (
                            <ArrowUpRight
                              size={16}
                              className="text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5"
                            />
                          )}
                        </div>

                        {/* Company/Project */}
                        <p className="text-sm font-medium text-primary-600 mb-3">
                          {founder.company}
                        </p>

                        {/* Current Occupation */}
                        {founder.currentOccupation && founder.currentOccupation !== 'N/A' && (
                          <div className="pt-3 border-t border-neutral-100">
                            <div className="flex items-start gap-2">
                              <Briefcase size={12} className="text-neutral-400 mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-neutral-500 leading-relaxed">
                                {founder.currentOccupation}
                              </p>
                            </div>
                          </div>
                        )}
                      </CardWrapper>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {filteredFounders.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">No founders found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FounderDirectory;
