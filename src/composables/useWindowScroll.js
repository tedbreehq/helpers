import { isClient } from '../helpers/validate.js'
import { ref } from '@vue/composition-api'
import { useEventListener } from './useEventListener.js'

export function useWindowScroll () {
    const x = ref(isClient ? window.pageXOffset : 0);
    const y = ref(isClient ? window.pageYOffset : 0);

    useEventListener(
        'scroll',
        () => {
            x.value = window.pageXOffset
            y.value = window.pageYOffset
        },
        {
            capture: false,
            passive: true,
        });

    return { x, y }
}
