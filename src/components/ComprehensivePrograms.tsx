"use client";

import * as React from "react";
import { ExpandableCard } from "@/components/ui/expandable-card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function ComprehensivePrograms() {
  const [isCardExpanded, setIsCardExpanded] = React.useState(false);

  const cards = [
    {
      title: "Data-Driven Decision Making",
      description: "Excel, Python & Power BI",
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      content: () => (
        <>
          <h4 className="text-xl font-semibold text-black dark:text-white">Master the Tools of Modern Analysis</h4>
          <p>In today's business landscape, the ability to interpret and leverage data is paramount. This program is designed to empower your team with the essential skills to turn raw data into actionable insights.</p>
          <h5 className="text-lg font-semibold text-black dark:text-white mt-2">Core Competencies:</h5>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Advanced Excel:</strong> Go beyond basic spreadsheets. Master PivotTables, Power Query, and advanced data analysis techniques.</li>
            <li><strong>Python for Data Analysis:</strong> Learn the fundamentals of Python, the leading language for data science.</li>
            <li><strong>Power BI Dashboards:</strong> Transform data into compelling visual stories and create stunning, interactive dashboards.</li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            Inquire Now <ArrowRight className="h-5 w-5" />
          </button>
        </>
      ),
    },
    {
      title: "Executive Communication & Presence",
      description: "Corporate Soft Skills Training",
      src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop",
      content: () => (
        <>
          <h4 className="text-xl font-semibold text-black dark:text-white">Lead with Confidence and Clarity</h4>
          <p>Effective communication is the cornerstone of leadership. This program is tailored for professionals seeking to refine their soft skills, enhance their executive presence, and communicate with impact.</p>
          <h5 className="text-lg font-semibold text-black dark:text-white mt-2">Key Development Areas:</h5>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>Public Speaking & Presentation:</strong> Overcome nervousness and deliver compelling presentations.</li>
            <li><strong>Advanced Body Language:</strong> Understand the nuances of non-verbal communication to build rapport.</li>
            <li><strong>The Art of Storytelling:</strong> Move beyond facts and figures to structure narratives that persuade and inspire.</li>
          </ul>
          <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
            Inquire Now <ArrowRight className="h-5 w-5" />
          </button>
        </>
      ),
    },
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white sm:text-4xl mb-12">
          Comprehensive Programs
        </h2>
        <div className={cn(
            "card-grid flex justify-center flex-wrap gap-8",
            { 'has-perspective': !isCardExpanded }
        )}>
          {cards.map((card, index) => (
            <ExpandableCard
              key={index}
              title={card.title}
              description={card.description}
              src={card.src}
              onExpand={() => setIsCardExpanded(true)}
              onCollapse={() => setIsCardExpanded(false)}
            >
              {card.content()}
            </ExpandableCard>
          ))}
        </div>
      </div>
    </section>
  );
} 