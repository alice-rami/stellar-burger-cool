import { useState, ReactNode, useEffect } from 'react';
import { ScreenSizeContext } from './context';
import { useMediaQuery } from 'react-responsive';
import { ScreenSizes } from './types';

interface DeviceProviderProps {
  children?: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' });
  const [screenSize, setScreenSize] = useState<ScreenSizes>({
    isDesktop: false,
    isMobile: false,
  });

  useEffect(() => {
    if (isMobile) {
      setScreenSize({ isMobile: true, isDesktop: false });
    } else if (isDesktop) {
      setScreenSize({ isMobile: false, isDesktop: true });
    } else {
      setScreenSize({ isMobile: false, isDesktop: false });
    }
  }, [isDesktop, isMobile]);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};
