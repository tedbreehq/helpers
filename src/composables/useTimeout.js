import { ref, onUnmounted, getCurrentInstance } from '@vue/composition-api'

export function useTimeout (interval = 1000, startRightNow = true) {
    const ready = ref(false);

    let timer = null;

    function stop () {
        ready.value = false;
        if (timer) {
            clearTimeout(timer);
            timer = null
        }
    }

    function start () {
        stop();
        timer = setTimeout(() => {
            ready.value = true;
            timer = null
        }, interval)
    }

    if (startRightNow)
        start();

    if (getCurrentInstance())
        onUnmounted(stop);

    return { ready, start, stop }
}
