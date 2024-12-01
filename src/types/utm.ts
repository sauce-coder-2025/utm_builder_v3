// types/utm.ts

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export interface FormOptions {
  markets: string[];
  brands: Record<string, string[]>;
  productCategories: string[];
  subCategories: Record<string, string[]>;
  channels: string[];
  channelTypes: Record<string, string[]>;
  mediaObjectives: Record<string, string[]>;
}

export interface CampaignOrganization {
  market: string;
  brand: string;
  productCategory: string;
  subCategory: string;
}

export interface CampaignTiming {
  startDate: string;
  endDate: string;
  isYearRound: boolean;
}

export interface CampaignDetails {
  channel: string;
  channelType: string;
  mediaObjective: string;
}

export interface CampaignStructure {
  campaignName: string;
  adSetName: string;
  adName: string;
}

export interface UTMParameters {
  source: string;
  medium: string;
  campaign: string;
  term: string;
  content: string;
}

export interface FormState extends CampaignOrganization, CampaignTiming, CampaignDetails, CampaignStructure {
  utmParameters: UTMParameters;
  isAutoMode: boolean;
}

export interface UTMEntry {
  id: string;
  timestamp: string;
  url: string;
  parameters: UTMParameters;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}
