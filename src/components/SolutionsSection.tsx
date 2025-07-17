
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BarChart, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SolutionsSection = () => {
  const solutions = [
    {
      icon: Users,
      title: 'Soft Skills Training',
      description: 'Leadership development, communication mastery, and team collaboration skills that drive organizational success.',
      features: ['Leadership Excellence', 'Communication Skills', 'Team Building', 'Emotional Intelligence'],
      color: 'bg-blue-50 text-blue-600',
    },
    {
      icon: FileText,
      title: 'Microsoft Excel Mastery',
      description: 'From basic functions to advanced analytics, transform your team into Excel power users.',
      features: ['Advanced Formulas', 'Data Visualization', 'Pivot Tables', 'Macro Automation'],
      color: 'bg-green-50 text-green-600',
    },
    {
      icon: BarChart,
      title: 'Data Science for Corporates',
      description: 'Unlock the power of data-driven decision making with practical analytics training.',
      features: ['Data Analysis', 'Statistical Modeling', 'Business Intelligence', 'Predictive Analytics'],
      color: 'bg-purple-50 text-purple-600',
    },
    {
      icon: Briefcase,
      title: 'Customized Corporate Programs',
      description: 'Bespoke training solutions designed specifically for your organization\'s unique challenges.',
      features: ['Needs Assessment', 'Custom Curriculum', 'On-site Training', 'Progress Tracking'],
      color: 'bg-orange-50 text-orange-600',
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our Training Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive training programs designed to elevate your workforce and drive business excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {solutions.map((solution, index) => (
            <Card key={index} className="hover-lift group border-0 shadow-lg bg-white">
              <CardHeader className="pb-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 ${solution.color}`}>
                  <solution.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl text-gray-900 group-hover:text-sapphire transition-colors">
                  {solution.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {solution.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-sapphire rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-sapphire text-sapphire hover:bg-sapphire hover:text-white transition-all"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Every organization is unique. Let's create a training program that fits your specific needs and goals.
            </p>
            <Button 
              size="lg"
              className="bg-sapphire hover:bg-sapphire/90 text-white px-8 py-3"
            >
              Discuss Custom Training
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
