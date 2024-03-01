import { createContext } from 'react';
import { ScreenSizes } from './types';

export const ScreenSizeContext = createContext<ScreenSizes>({
  isDesktop: false,
  isMobile: false,
});
