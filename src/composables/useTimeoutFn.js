import { watch } from '@vue/composition-api';
import { useTimeout } from './useTimeout.js';

export function useTimeoutFn(cb, interval) {
    const { ready, start, stop } = useTimeout(interval);

    watch(
        ready,
        (maturity) => {
            maturity && cb()
        },
        { lazy: true },
    );

    return { ready, start, stop }
}
