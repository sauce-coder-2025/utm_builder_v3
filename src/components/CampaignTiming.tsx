// /src/components/CampaignTiming.tsx
import React from 'react';
import { useFormStore } from '../store/formStore';
import FormSection from './FormSection';

const CampaignTiming: React.FC = () => {
  const { startDate, endDate, isYearRound, setField } = useFormStore();

  return (
    <FormSection title="Campaign Timing">
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isYearRound"
          checked={isYearRound}
          onChange={(e) => setField('isYearRound', e.target.checked)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label htmlFor="isYearRound" className="ml-2 text-sm text-gray-700">
          Year Round Campaign
        </label>
      </div>

      {!isYearRound && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setField('startDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setField('endDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
              min={startDate}
            />
          </div>
        </div>
      )}
    </FormSection>
  );
};

export default CampaignTiming;
