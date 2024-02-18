import React from 'react';
import { ScreenSizes } from './types';

export const ScreenSizeContext = React.createContext<ScreenSizes>({
  isDesktop: false,
  isMobile: false,
});
