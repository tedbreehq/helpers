import { useMediaQuery }  from './useMediaQuery'

export const usePreferredDark = () => useMediaQuery('(prefers-color-scheme: dark)');

export const usePreferredLight = () => useMediaQuery('(prefers-color-scheme: light)');