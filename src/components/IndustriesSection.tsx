import React from 'react';
import { Building, Zap, Heart, GraduationCap, Banknote, ShoppingCart } from 'lucide-react';
const IndustriesSection = () => {
  const industries = [{
    icon: Building,
    name: 'Technology',
    description: 'Software companies, startups, and tech enterprises'
  }, {
    icon: Banknote,
    name: 'Financial Services',
    description: 'Banks, investment firms, and fintech companies'
  }, {
    icon: Heart,
    name: 'Healthcare',
    description: 'Hospitals, pharmaceutical, and medical device companies'
  }, {
    icon: GraduationCap,
    name: 'Education',
    description: 'Universities, schools, and educational institutions'
  }, {
    icon: Zap,
    name: 'Energy & Utilities',
    description: 'Power companies and renewable energy firms'
  }, {
    icon: ShoppingCart,
    name: 'Retail & E-commerce',
    description: 'Online and traditional retail organizations'
  }];
  return <section id="industries" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Industries We Serve
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our training expertise spans across diverse industries, helping organizations of all sizes achieve their learning objectives
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => <div key={index} className="group text-center p-8 rounded-2xl transition-all hover-lift bg-slate-950">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sapphire/10 rounded-full mb-6 group-hover:bg-sapphire group-hover:text-white transition-all">
                <industry.icon className="w-8 h-8 text-sapphire group-hover:text-white" />
              </div>
              <h3 className="text-xl mb-3 group-hover:text-sapphire transition-colors text-slate-300 font-semibold">
                {industry.name}
              </h3>
              <p className="leading-relaxed text-slate-300">
                {industry.description}
              </p>
            </div>)}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-sapphire to-blue-600 rounded-2xl p-8 text-white bg-slate-950">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Don't See Your Industry?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              We've successfully delivered training programs across many more sectors. 
              Let's discuss how we can help your specific industry challenges.
            </p>
            <button className="bg-white text-sapphire px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default IndustriesSection;