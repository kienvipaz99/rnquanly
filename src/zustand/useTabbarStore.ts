import { Animated } from 'react-native';
import { create } from 'zustand';

interface CombinedStore {
  changeBottomTab: { index: number; color: string };
  setChangeBottomTab: (index: number, color: string) => void;
  translateX: Animated.Value;
  setTranslateX: (value: Animated.Value) => void;
}

export const useTabbarStore = create<CombinedStore>(set => ({
  changeBottomTab: { index: 0, color: 'white' },
  translateX: new Animated.Value(0),

  setChangeBottomTab: (index, color) => set({ changeBottomTab: { index, color } }),
  setTranslateX: value => set({ translateX: value }),
}));
