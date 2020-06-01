import { ref } from '@vue/composition-api'
import { useTimeoutFn } from './useTimeoutFn'

export function useAsyncState (
    promise,
    defaultState,
    delay = 0,
    catchFn = {},
) {
    const state = ref(defaultState);
    const ready = ref(false);

    function run () {
        promise
            .then((data) => {
                state.value = data;
                ready.value = true;
            })
            .catch(catchFn)
    }

    (!delay) ? run() : useTimeoutFn(run, delay);

    return { state, ready }
}
