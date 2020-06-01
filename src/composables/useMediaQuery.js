import { ref, onMounted, onUnmounted } from '@vue/composition-api'

export function useMediaQuery (query) {
    let mediaQuery;

    // try to fetch initial value (avoid SSR issues)
    if (typeof window !== 'undefined')
        mediaQuery = window.matchMedia(query);

    const matches = ref(mediaQuery ? mediaQuery.matches : false);

    function handler (event) {
        matches.value = event.matches
    }

    onMounted(() => {
        if (!mediaQuery)
            mediaQuery = window.matchMedia(query);

        matches.value = mediaQuery.matches;
        mediaQuery.addListener(handler)
    });

    onUnmounted(() => mediaQuery.removeListener(handler));

    return matches
}