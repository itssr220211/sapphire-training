import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, BarChart, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollRevealSection from './ScrollRevealSection';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const InteractiveSolutions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const solutions = [{
    icon: Users,
    title: 'Soft Skills Training',
    subtitle: 'Leadership & Communication Excellence',
    description: 'Transform your team into confident leaders with our comprehensive soft skills training. Master the art of communication, emotional intelligence, and team dynamics.',
    features: ['Leadership Development', 'Communication Mastery', 'Team Collaboration', 'Emotional Intelligence', 'Conflict Resolution', 'Public Speaking'],
    gradient: 'from-purple-500 to-pink-500',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    benefits: ['Improved team productivity', 'Better workplace communication', 'Enhanced leadership capabilities']
  }, {
    icon: FileText,
    title: 'Microsoft Excel Mastery',
    subtitle: 'From Basics to Advanced Analytics',
    description: 'Unlock the full potential of Excel with comprehensive training from basic functions to advanced data analysis, automation, and business intelligence.',
    features: ['Advanced Formulas & Functions', 'Data Visualization & Charts', 'Pivot Tables & Analysis', 'Macro Automation', 'Power Query & BI', 'Financial Modeling'],
    gradient: 'from-green-500 to-teal-500',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    benefits: ['Increased data processing efficiency', 'Better decision-making capabilities', 'Time-saving automation skills']
  }, {
    icon: BarChart,
    title: 'Data Science for Corporates',
    subtitle: 'Data-Driven Decision Making',
    description: 'Empower your organization with data science capabilities. Learn statistical analysis, predictive modeling, and business intelligence to drive strategic decisions.',
    features: ['Statistical Analysis', 'Machine Learning Basics', 'Data Visualization', 'Predictive Analytics', 'Business Intelligence', 'Python for Data Science'],
    gradient: 'from-blue-500 to-indigo-500',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    benefits: ['Data-driven insights', 'Predictive business strategies', 'Competitive market advantage']
  }, {
    icon: Briefcase,
    title: 'Customized Corporate Programs',
    subtitle: 'Tailored Solutions for Your Business',
    description: 'Every organization is unique. Our customized programs are designed specifically for your industry, challenges, and business objectives.',
    features: ['Needs Assessment', 'Custom Curriculum Design', 'Industry-Specific Training', 'On-site Delivery', 'Progress Tracking', '24/7 Support'],
    gradient: 'from-orange-500 to-red-500',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    benefits: ['Targeted skill development', 'Industry-relevant training', 'Measurable ROI']
  }];
  useEffect(() => {
    if (!sectionRef.current || !scrollContainerRef.current || !titleRef.current) return;
    const ctx = gsap.context(() => {
      // Animate the title on scroll
      gsap.fromTo(titleRef.current, {
        backgroundPosition: '0% 50%',
        scale: 1
      }, {
        backgroundPosition: '100% 50%',
        scale: 1.05,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Horizontal scroll animation
      const scrollWidth = scrollContainerRef.current!.scrollWidth - scrollContainerRef.current!.clientWidth;
      gsap.to(scrollContainerRef.current, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollWidth + window.innerHeight}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Animate cards on scroll
      gsap.set('.program-card', {
        y: 100,
        opacity: 0
      });
      gsap.to('.program-card', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none reverse'
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return <section ref={sectionRef} id="solutions" className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <ScrollRevealSection>
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 text-sapphire mb-6">
              <div className="w-12 h-px bg-sapphire"></div>
              <span className="text-sm font-medium tracking-wider uppercase">Our Solutions</span>
              <div className="w-12 h-px bg-sapphire"></div>
            </div>
            <h2 ref={titleRef} className="text-5xl lg:text-7xl font-bold mb-6 cursor-pointer relative group">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sapphire via-purple-600 via-pink-500 to-sapphire bg-[length:300%_100%] animate-gradient-x hover:animate-pulse transition-all duration-500">
                Comprehensive
              </span>{' '}
              <span className="text-gray-900 group-hover:text-sapphire transition-colors duration-300">
                Programs
              </span>
              <div className="absolute -inset-4 bg-gradient-to-r from-sapphire/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Elevate your workforce with world-class training experiences designed for measurable business impact
            </p>
          </div>
        </ScrollRevealSection>
      </div>

      

      <ScrollRevealSection delay={400}>
        <div className="text-center mt-20 px-6">
          <div className="bg-gradient-to-r from-sapphire to-blue-600 rounded-3xl p-12 text-white relative overflow-hidden max-w-4xl mx-auto bg-slate-700">
            <div className="absolute inset-0 bg-slate-950"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Every organization is unique. Let's create a training program that fits your specific needs and goals.
              </p>
              <Button size="lg" className="bg-white text-sapphire hover:bg-blue-50 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105">
                Discuss Custom Training
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-300/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </ScrollRevealSection>
    </section>;
};
export default InteractiveSolutions;