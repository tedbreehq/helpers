import { onMounted, onUnmounted } from '@vue/composition-api';

export function useEventListener(type, listener, options, target = window) {
    onMounted(() => target.addEventListener(type, listener, options));

    onUnmounted(() => target.removeEventListener(type, listener, options));
}
