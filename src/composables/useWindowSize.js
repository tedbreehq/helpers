import { isClient } from '../helpers'
import {computed, ref} from '@vue/composition-api'
import { useEventListener } from './useEventListener'

let screens = {
    sm: '640px',
    md: '1024px', // 768 + 256
    lg: '1280px', // 1024 + 256
    xl: '1536px', // 1280 + 256
};

export function useWindowSize (initialWidth = Infinity, initialHeight = Infinity) {
    const width = ref(isClient ? window.innerWidth : initialWidth);
    const height = ref(isClient ? window.innerWidth : initialHeight);

    if (!isClient) {
        useEventListener('resize', () => {
            width.value = window.innerWidth
            height.value = window.innerHeight
        })
    }

    const isMobile = computed(() => width.value <= parseInt(screens.sm));
    const isTablet = computed(() => width.value > parseInt(screens.sm) && width.value < parseInt(screens.md));
    const isDesktop = computed(() => width.value >= parseInt(screens.md) && width.value <= parseInt(screens.lg));
    const isLargeScreen = computed(() => width.value > parseInt(screens.xl));



    return { width, height, isMobile, isTablet, isDesktop, isLargeScreen }
}
