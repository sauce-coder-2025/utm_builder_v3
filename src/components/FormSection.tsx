// /src/components/FormSection.tsx
import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="bg-white p-4 rounded-lg shadow">{children}</div>
    </div>
  );
};

export default FormSection;
