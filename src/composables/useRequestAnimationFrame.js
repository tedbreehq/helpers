import { getCurrentInstance, onUnmounted } from '@vue/composition-api'

export function useRequestAnimationFrame (fn, startNow = false) {
    let started = false;

    function loop () {
        if (!started)
            return;
        fn();
        requestAnimationFrame(loop);
    }

    function start () {
        if (!started) {
            started = true;
            loop()
        }
    }

    function stop () {
        started = false
    }

    if (startNow)
        start();

    if (getCurrentInstance())
        onUnmounted(() => stop());

    return { stop, start }
}