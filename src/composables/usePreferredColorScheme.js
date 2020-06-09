import { useMediaQuery }  from './useMediaQuery.js'

export const usePreferredDark = () => useMediaQuery('(prefers-color-scheme: dark)');

export const usePreferredLight = () => useMediaQuery('(prefers-color-scheme: light)');