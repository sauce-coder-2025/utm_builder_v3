// /src/components/CampaignStructure.tsx
import React from 'react';
import { useFormStore } from '../store/formStore';
import FormSection from './FormSection';

const CampaignStructure: React.FC = () => {
  const { campaignName, adSetName, adName, setField } = useFormStore();

  return (
    <FormSection title="Campaign Structure">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={campaignName}
            onChange={(e) => setField('campaignName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter campaign name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad Set Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={adSetName}
            onChange={(e) => setField('adSetName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter ad set name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ad Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            value={adName}
            onChange={(e) => setField('adName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="Enter ad name"
          />
        </div>
      </div>
    </FormSection>
  );
};

export default CampaignStructure;
