// store/formStore.ts
import { create } from 'zustand';
import { FormState, FormOptions } from '../types/utm';

interface FormStore extends FormState {
  options: FormOptions;
  setField: (field: keyof FormState, value: any) => void;
  resetForm: () => void;
  generateUTMParameters: () => void;
}

const initialState: FormState = {
  market: '',
  brand: '',
  productCategory: '',
  subCategory: '',
  startDate: '',
  endDate: '',
  isYearRound: false,
  channel: '',
  channelType: '',
  mediaObjective: '',
  campaignName: '',
  adSetName: '',
  adName: '',
  isAutoMode: true,
  utmParameters: {
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: ''
  }
};

export const useFormStore = create<FormStore>((set, get) => ({
  ...initialState,
  options: {
    markets: [],
    brands: {},
    productCategories: [],
    subCategories: {},
    channels: [],
    channelTypes: {},
    mediaObjectives: {}
  },

  setField: (field, value) => {
    set({ [field]: value });
    
    // Handle dependent fields
    const state = get();
    if (field === 'market') {
      set({ brand: '' });
    } else if (field === 'productCategory') {
      set({ subCategory: '' });
    } else if (field === 'channel') {
      set({ channelType: '', mediaObjective: '' });
    } else if (field === 'channelType') {
      set({ mediaObjective: '' });
    }

    // Auto-generate UTM parameters if in auto mode
    if (state.isAutoMode) {
      get().generateUTMParameters();
    }
  },

  resetForm: () => {
    set(initialState);
  },

  generateUTMParameters: () => {
    const state = get();
    const utmParameters = {
      source: state.channel.toLowerCase(),
      medium: state.channelType.toLowerCase(),
      campaign: `${state.market}_${state.brand}_${state.productCategory}_${state.campaignName}`.toLowerCase(),
      term: state.mediaObjective.toLowerCase(),
      content: `${state.adSetName}_${state.adName}`.toLowerCase()
    };
    set({ utmParameters });
  }
}));
