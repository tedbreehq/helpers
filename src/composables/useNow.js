import { ref, getCurrentInstance, onUnmounted } from '@vue/composition-api'
import { timestamp } from "../helpers";

export function useNow() {
    const now = ref(timestamp());
    let started = false;

    const update = () => {
        requestAnimationFrame(() => {
            now.value = timestamp();
            if (started)
                update()
        })
    };

    const start = () => {
        if (!started) {
            started = true;
            update()
        }
    };

    const stop = () => {
        started = false
    };

    start();

    if (getCurrentInstance()) onUnmounted(() => stop());

    return now
}
