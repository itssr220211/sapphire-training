
import React from 'react';
import { Users, Award, Target, Zap } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { number: '1,200+', label: 'Professionals Trained', icon: Users },
    { number: '50+', label: 'Enterprise Clients', icon: Award },
    { number: '95%', label: 'Success Rate', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Zap },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Sapphire Training Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are a premier training consultancy specializing in corporate excellence. 
            Our mission is to unlock human potential through strategic learning initiatives 
            that drive measurable business outcomes.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-sapphire/10 rounded-full mb-4 group-hover:bg-sapphire/20 transition-colors">
                <stat.icon className="w-8 h-8 text-sapphire" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-sapphire mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="bg-gray-50 rounded-2xl p-8 lg:p-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              To bridge the skills gap in modern organizations by delivering world-class training 
              experiences that combine theoretical excellence with practical application. We believe 
              that every professional has the potential to excel when given the right tools, 
              knowledge, and support.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div>
                <h4 className="font-semibold text-sapphire mb-2">Expert-Led</h4>
                <p className="text-gray-600">Industry professionals with proven track records</p>
              </div>
              <div>
                <h4 className="font-semibold text-sapphire mb-2">Customized</h4>
                <p className="text-gray-600">Tailored programs for your specific business needs</p>
              </div>
              <div>
                <h4 className="font-semibold text-sapphire mb-2">Results-Driven</h4>
                <p className="text-gray-600">Measurable outcomes and continuous improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
