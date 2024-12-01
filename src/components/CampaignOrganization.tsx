// /src/components/CampaignOrganization.tsx
import React from 'react';
import { useFormStore } from '../store/formStore';
import FormSection from './FormSection';
import SelectField from './SelectField';

const CampaignOrganization: React.FC = () => {
  const {
    market,
    brand,
    productCategory,
    subCategory,
    options,
    setField
  } = useFormStore();

  return (
    <FormSection title="Campaign Organization">
      <SelectField
        label="Market"
        value={market}
        onChange={(value) => setField('market', value)}
        options={options.markets}
        required
      />

      <SelectField
        label="Brand"
        value={brand}
        onChange={(value) => setField('brand', value)}
        options={options.brands[market] || []}
        disabled={!market}
        required
      />

      <SelectField
        label="Product Category"
        value={productCategory}
        onChange={(value) => setField('productCategory', value)}
        options={options.productCategories}
        required
      />

      <SelectField
        label="Sub Category"
        value={subCategory}
        onChange={(value) => setField('subCategory', value)}
        options={options.subCategories[productCategory] || []}
        disabled={!productCategory}
      />
    </FormSection>
  );
};

export default CampaignOrganization;
