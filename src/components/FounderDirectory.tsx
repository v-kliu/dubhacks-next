import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface Founder {
  name: string;
  company: string;
  batch: string;
  projectLink?: string;
  currentOccupation?: string;
}

const FounderDirectory: React.FC = () => {
  const [founders, setFounders] = useState<Founder[]>([]);

  // Function to get batch-specific colors
  const getBatchColor = (batch: string): string => {
    const batchColors: { [key: string]: string } = {
      'Batch 0': 'border-gray-400',
      'Batch 1': 'border-purple-400',
      'Batch 2': 'border-green-400',
      'Batch 3': 'border-blue-400',
      'Batch 4': 'border-orange-400',
    };
    return batchColors[batch] || 'border-neutral-400';
  };

  const getBatchTextColor = (batch: string): string => {
    const batchTextColors: { [key: string]: string } = {
      'Batch 0': 'text-gray-700',
      'Batch 1': 'text-purple-700',
      'Batch 2': 'text-green-700',
      'Batch 3': 'text-blue-700',
      'Batch 4': 'text-orange-700',
    };
    return batchTextColors[batch] || 'text-neutral-700';
  };

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

  // Group founders by batch
  const groupedFounders = founders.reduce((acc, founder) => {
    if (!acc[founder.batch]) {
      acc[founder.batch] = [];
    }
    acc[founder.batch].push(founder);
    return acc;
  }, {} as Record<string, Founder[]>);

  const batchOrder = ['Batch 4', 'Batch 3', 'Batch 2', 'Batch 1', 'Batch 0'];

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
              Founder Directory
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto">
              Meet the talented founders building the future.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Results - Grouped by Batch */}
      <div className="relative max-w-7xl mx-auto px-6 py-12 z-10">
        {batchOrder.map(batch => {
          const batchFounders = groupedFounders[batch];
          if (!batchFounders || batchFounders.length === 0) return null;

          return (
            <div key={batch} className="mb-12">
              {/* Batch Header */}
              <div className="mb-6">
                <h2 className={`text-3xl font-light ${getBatchTextColor(batch)} inline-block pb-2 border-b-4 ${getBatchColor(batch)}`}>
                  {batch}
                </h2>
              </div>

              {/* Founders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {batchFounders.map((founder, index) => (
                  <motion.div
                    key={`${founder.name}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className={`bg-white rounded-lg border-l-4 ${getBatchColor(batch)} shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col p-4`}>
                      {/* Name - Smaller */}
                      <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                        {founder.name}
                      </h3>

                      {/* Project with Link */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-primary-600 font-medium text-sm">
                          {founder.company}
                        </span>
                        {founder.projectLink && founder.projectLink !== 'N/A' && (
                          <a
                            href={founder.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 transition-colors"
                            title="View Project"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>

                      {/* Current Occupation */}
                      {founder.currentOccupation && founder.currentOccupation !== 'N/A' && (
                        <div className={`mt-auto pt-3 border-t border-neutral-100`}>
                          <p className="text-xs text-neutral-600">
                            <span className="font-medium">Currently:</span> {founder.currentOccupation}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default FounderDirectory;
