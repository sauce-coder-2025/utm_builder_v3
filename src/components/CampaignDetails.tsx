// /src/components/CampaignDetails.tsx
import React from 'react';
import { useFormStore } from '../store/formStore';
import FormSection from './FormSection';
import SelectField from './SelectField';

const CampaignDetails: React.FC = () => {
  const {
    channel,
    channelType,
    mediaObjective,
    options,
    setField
  } = useFormStore();

  return (
    <FormSection title="Campaign Details">
      <SelectField
        label="Channel"
        value={channel}
        onChange={(value) => setField('channel', value)}
        options={options.channels}
        required
      />

      <SelectField
        label="Channel Type"
        value={channelType}
        onChange={(value) => setField('channelType', value)}
        options={options.channelTypes[channel] || []}
        disabled={!channel}
        required
      />

      <SelectField
        label="Media Objective"
        value={mediaObjective}
        onChange={(value) => setField('mediaObjective', value)}
        options={options.mediaObjectives[channelType] || []}
        disabled={!channelType}
        required
      />
    </FormSection>
  );
};

export default CampaignDetails;
