import { ScreenSizeContext } from './context';
import { useContext } from 'react';

export function useScreenSize() {
  return useContext(ScreenSizeContext);
}
