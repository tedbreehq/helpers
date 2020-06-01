import { ref, onMounted, onUnmounted } from '@vue/composition-api'

export function useWebWorker (url) {
    const data = ref(null);
    let worker;

    const post = function post (val) {
        if (!worker) return;

        worker.postMessage(val);
    };

    const terminate = function terminate () {
        if (!worker) return;

        worker.terminate()
    };

    onMounted(() => {
        worker = new Worker(url);

        worker.onmessage = (e) => {
            data.value = e.data
        }
    });

    onUnmounted(() => {
        worker.terminate()
    });

    return {
        data,
        post,
        terminate,
    }
}