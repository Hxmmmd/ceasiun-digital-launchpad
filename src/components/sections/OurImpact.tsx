import React from 'react';

// Sample data to make the UI component modular and highly reusable
const metrics = [
  {
    id: 1,
    stat: '99.9%',
    label: 'Platform Uptime',
    description: 'Ensuring consistent, enterprise-grade availability for operations.',
  },
  {
    id: 2,
    stat: '$42M+',
    label: 'Capital Secured',
    description: 'Direct financial growth driven sustainably for our global users.',
  },
  {
    id: 3,
    stat: '150k+',
    label: 'Active Builders',
    description: 'A growing community leveraging our modular frontend ecosystems.',
  },
  {
    id: 4,
    stat: '4.5M+',
    label: 'Carbon Offset (lbs)',
    description: 'Measured, verifiable impact helping build green tech initiatives.',
  },
];

export default function ImpactSection() {
  return (
    <section className="bg-slate-50 py-24 sm:py-32 dark:bg-slate-900 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 sm:mb-20">
          <h2 className="text-base font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Real-World Impact
          </h2>
          <p className="mt-2 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Making a difference, one metric at a time.
          </p>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            We focus on real outcomes. Here is how our software ecosystem scales businesses while remaining committed to sustainable development.
          </p>
        </div>

        {/* Impact Cards Grid */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:max-w-none lg:grid-cols-4">
          {metrics.map((item) => (
            <div 
              key={item.id} 
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200/50 hover:shadow-md transition-all duration-300 dark:bg-slate-800 dark:ring-slate-700/50"
            >
              <div>
                {/* Big Stat Number */}
                <span className="block text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                  {item.stat}
                </span>
                {/* Short Title Label */}
                <span className="mt-3 block text-base font-semibold text-indigo-600 dark:text-indigo-400">
                  {item.label}
                </span>
                {/* Micro Description */}
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}