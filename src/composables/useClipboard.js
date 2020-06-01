import { ref } from '@vue/composition-api'
import { useEventListener } from './useEventListener'

export function useClipboard () {
    const text = ref('');

    const supported = ref('clipboard' in window.navigator);

    const copy = (txt)  =>  window.navigator.clipboard.writeText(text.value = txt)

    useEventListener('copy', () => {
        window.navigator.clipboard.readText().then(value => text.value = value)
    });

    return {
        text,
        copy,
        supported,
    }
}