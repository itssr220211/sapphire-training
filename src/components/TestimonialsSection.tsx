
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "Sapphire Training Solutions transformed our team's Excel capabilities. The ROI was immediate and measurable. Our data processing efficiency increased by 300%.",
      author: "Sarah Chen",
      position: "Data Analytics Manager",
      company: "TechCorp Industries",
      rating: 5,
    },
    {
      quote: "The soft skills training program was exactly what our leadership team needed. The facilitators were exceptional and the content was immediately applicable.",
      author: "Michael Rodriguez",
      position: "HR Director",
      company: "Global Finance Group",
      rating: 5,
    },
    {
      quote: "Professional, thorough, and results-driven. Sapphire's custom training program addressed our specific challenges and delivered beyond expectations.",
      author: "Jennifer Walsh",
      position: "Operations Director",
      company: "Healthcare Solutions Inc.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-sapphire text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rotate-45 rounded-lg"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rotate-45 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rotate-45 rounded-lg"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our Clients Say
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what leading organizations say about their experience with Sapphire Training Solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glassmorphic border-white/20 hover-lift">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 leading-relaxed text-white">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-white/20 pt-6">
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-blue-200">{testimonial.position}</div>
                  <div className="text-blue-300 text-sm">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="glassmorphic rounded-2xl p-8 inline-block border-white/20">
            <h3 className="text-2xl font-bold mb-2">Join 1,200+ Satisfied Professionals</h3>
            <p className="text-blue-100 mb-6">Ready to transform your team's capabilities?</p>
            <button className="bg-white text-sapphire px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Training Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
