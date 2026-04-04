import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Briefcase, Linkedin } from 'lucide-react';

interface Member {
  name: string;
  company?: string;
  batch: string;
  role?: string;
  linkedin?: string;
  projectLink?: string;
  currentOccupation?: string;
}

const FounderDirectory: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string>('All');

  const batches = ['All', 'Batch 5', 'Batch 4', 'Batch 3', 'Batch 2', 'Batch 1', 'Batch 0'];
  const batchOrder = ['Batch 5', 'Batch 4', 'Batch 3', 'Batch 2', 'Batch 1', 'Batch 0'];

  const filteredMembers = selectedBatch === 'All'
    ? members
    : members.filter(m => m.batch === selectedBatch);

  const groupedMembers = filteredMembers.reduce((acc, member) => {
    if (!acc[member.batch]) acc[member.batch] = [];
    acc[member.batch].push(member);
    return acc;
  }, {} as Record<string, Member[]>);

  const sortBatchMembers = (members: Member[]) =>
    [...members].sort((a, b) => {
      const priority = (m: Member) => (m.role === 'EiR' ? 1 : 0);
      return priority(a) - priority(b);
    });

  const parseMembers = (data: string): Member[] => {
    const list: Member[] = [];
    const entries = data.split(/(?=\n\{)/);

    entries.forEach(entry => {
      if (!entry.includes('name:') || entry.includes('TEMPLATE:')) return;
      try {
        const nameMatch = entry.match(/name:\s*['"]([^'"]+)['"]/);
        const batchMatch = entry.match(/batch:\s*['"]([^'"]+)['"]/);
        if (!nameMatch || !batchMatch) return;

        const companyRaw = entry.match(/company:\s*['"]([^'"]+)['"]/)?.[1];
        const occupationRaw = entry.match(/currentOccupation:\s*['"]([^'"]+)['"]/)?.[1];

        list.push({
          name: nameMatch[1],
          batch: batchMatch[1],
          company: companyRaw && companyRaw !== 'N/A' ? companyRaw : undefined,
          role: entry.match(/role:\s*['"]([^'"]+)['"]/)?.[1],
          linkedin: entry.match(/linkedin:\s*['"]([^'"]+)['"]/)?.[1],
          projectLink: entry.match(/projectLink:\s*['"]([^'"]+)['"]/)?.[1],
          currentOccupation: occupationRaw && occupationRaw !== 'N/A' ? occupationRaw : undefined,
        });
      } catch (e) {
        console.error('Error parsing entry:', e);
      }
    });

    return list;
  };

  useEffect(() => {
    fetch('/founder_directory_data.txt')
      .then(r => r.text())
      .then(text => setMembers(parseMembers(text)))
      .catch(e => console.error('Error loading founder data:', e));
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
            <p className="text-neutral-400 text-lg whitespace-nowrap">
              Current and alumni founders who have been part of DubHacks Next.
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
              {filteredMembers.length} members
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {batchOrder.map(batch => {
          const batchMembers = sortBatchMembers(groupedMembers[batch] || []);
          if (batchMembers.length === 0) return null;

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
                <span className="text-xs text-neutral-400">{batchMembers.length} members</span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2.5">
                {batchMembers.map((member, index) => {
                  const hasProjectLink = !!member.projectLink;
                  const isEiR = member.role === 'EiR';

                  return (
                    <motion.div
                      key={`${member.name}-${index}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.015, 0.4) }}
                      className="bg-white border border-neutral-200 rounded-xl p-3.5 flex flex-col gap-1"
                    >
                      {/* Name + LinkedIn */}
                      <div className="flex items-start justify-between gap-1">
                        <h3 className="text-sm font-semibold text-neutral-900 leading-snug">
                          {member.name}
                        </h3>
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-opacity hover:opacity-80"
                            style={{ backgroundColor: '#0A66C2' }}
                          >
                            <Linkedin size={12} strokeWidth={1.5} className="text-white" />
                          </a>
                        )}
                      </div>

                      {/* Company */}
                      {member.company && (
                        hasProjectLink ? (
                          <a
                            href={member.projectLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-medium text-primary-600 hover:text-primary-700 flex items-center gap-0.5 w-fit"
                          >
                            {member.company}
                            <ArrowUpRight size={11} />
                          </a>
                        ) : (
                          <span className="text-xs font-medium text-primary-600">
                            {member.company}
                          </span>
                        )
                      )}

                      {/* Role badge */}
                      {isEiR && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full w-fit mt-0.5 bg-blue-50 text-blue-600">
                          EiR
                        </span>
                      )}

                      {/* Current occupation */}
                      {member.currentOccupation && (
                        <div className="flex items-start gap-1.5 mt-auto pt-2 border-t border-neutral-100">
                          <Briefcase size={10} className="text-neutral-400 mt-0.5 flex-shrink-0" />
                          <p className="text-xs text-neutral-500 leading-tight">
                            {member.currentOccupation}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-500">No members found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FounderDirectory;
