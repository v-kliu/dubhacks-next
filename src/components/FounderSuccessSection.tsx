import React from 'react';
import { motion } from 'framer-motion';
import { Building, Award, TrendingUp } from 'lucide-react';

const FounderSuccessSection: React.FC = () => {
  const successStats = [
    {
      icon: Building,
      title: 'YC Alumni',
      description: 'Our founders have been accepted to Y Combinator',
      companies: ['Million', 'Vly', 'Terrakotta', 'Meteor']
    },
    {
      icon: Award,
      title: 'Top Accelerators',
      description: 'Alumni across prestigious programs',
      companies: ['TechStars', 'Mozilla', 'SPC Fellowship']
    },
    {
      icon: TrendingUp,
      title: 'Successful Exits',
      description: 'Companies acquired by leading tech firms',
      companies: ['Pongo', 'Minute.Land', 'Quantum Labs']
    }
  ];

  const getCompanyLogo = (name: string): string => {
    const logos: { [key: string]: string } = {
      'Google': '/assets/company_logos/google.svg',
      'Microsoft': '/assets/company_logos/microsoft.svg',
      'Meta': '/assets/company_logos/meta.svg',
      'Apple': '/assets/company_logos/apple.svg',
      'Amazon': '/assets/company_logos/amazon.svg',
      'Netflix': '/assets/company_logos/netflix.svg',
      'Uber': '/assets/company_logos/uber.svg',
      'Stripe': '/assets/company_logos/stripe.svg',
      'LinkedIn': '/assets/company_logos/linkedin.svg',
      'Tesla': '/assets/company_logos/tesla.svg',
      'SpaceX': '/assets/company_logos/spacex.svg',
      'Figma': '/assets/company_logos/figma.svg',
      'Notion': '/assets/company_logos/notion.svg',
      'Adobe': '/assets/company_logos/adobe.svg',
      'Salesforce': '/assets/company_logos/salesforce.svg',
      'Palantir': '/assets/company_logos/palantir.svg'
    };
    return logos[name] || '';
  };

  const companies = [
    'Google', 'Microsoft', 'Meta', 'Apple', 'Amazon', 'Netflix', 'Uber', 'Stripe', 'LinkedIn', 'Tesla', 'SpaceX',
    'Figma', 'Notion', 'Adobe', 'Salesforce', 'Palantir'
  ];

  return (
    <section className="bg-white py-12 md:py-section px-4 md:px-6 lg:px-12">
      <div className="max-w-content mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="overline text-pink mb-4 inline-block px-4 py-2 bg-pink/10 rounded-full">PROVEN SUCCESS</div>
            <h2 className="section-title text-neutral-900 mb-4">You're in Good Hands</h2>
            <p className="text-gray text-sm md:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed px-4">
              Our founders don't just build companies - they join the ranks of tech leaders at Google, Amazon, and Microsoft,
              get accepted to YC and top accelerators, and create lasting impact in the startup ecosystem.
            </p>
          </motion.div>
        </div>

        {/* Success Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {successStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="text-primary-600" size={28} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">{stat.title}</h3>
              <p className="text-gray text-sm mb-4">{stat.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {stat.companies.slice(0, 2).map((company, companyIndex) => (
                  <span
                    key={companyIndex}
                    className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full"
                  >
                    {company}
                  </span>
                ))}
                {stat.companies.length > 2 && (
                  <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-full">
                    +{stat.companies.length - 2}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Company Directory */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-50 to-accent-50 p-8 md:p-12 rounded-2xl border border-primary-100"
        >
          <p className="text-center text-neutral-600 mb-8 max-w-4xl mx-auto">
            Before and after DubHacks Next, our founders come with experience from companies such as
          </p>
          
          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6 lg:gap-8 items-center">
            {companies.map((company, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-3 md:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center h-14 md:h-16 group"
              >
                {getCompanyLogo(company) ? (
                  <img
                    src={getCompanyLogo(company)}
                    alt={`${company} logo`}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                ) : (
                  <span className="text-xs font-medium text-neutral-600 text-center leading-tight">
                    {company}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FounderSuccessSection;