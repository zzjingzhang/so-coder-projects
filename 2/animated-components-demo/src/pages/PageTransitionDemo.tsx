import React, { useState } from 'react';
import Page from '../components/Page';
import LogoTitle from '../components/LogoTitle';
import TvShowCard from '../components/TvShowCard';
import { tvShowsData } from '../data/tvShowsData';

const PageTransitionDemo: React.FC = () => {
  const [expandedShowId, setExpandedShowId] = useState<number | null>(null);

  const toggleShow = (id: number) => {
    setExpandedShowId(expandedShowId === id ? null : id);
  };

  return (
    <Page title="Page Transitions">
      <div className="space-y-8">
        <LogoTitle
          title="Expandable TV Show Cards"
          subtitle="Click on any card to see smooth expansion animations"
          size="md"
        />

        <div className="space-y-4">
          {tvShowsData.map((show, index) => (
            <div
              key={show.id}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <TvShowCard
                show={show}
                isExpanded={expandedShowId === show.id}
                onToggle={() => toggleShow(show.id)}
              />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Animation Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Layout Transitions</h4>
                <p className="text-sm text-gray-500">Smooth height and width changes when expanding</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Image Scale</h4>
                <p className="text-sm text-gray-500">Thumbnail scales up to full image size</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Rotate Indicator</h4>
                <p className="text-sm text-gray-500">Chevron icon rotates to indicate expansion state</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PageTransitionDemo;
