import { isValidColor } from '../helpers/validate.js';
import { computed, ref } from '@vue/composition-api';

export function useColor(colorValue) {
    if(!isValidColor(colorValue)) return;

    const color = ref(colorValue);

    const hasColor = computed(() => color !== null);

    return { hasColor, color }
}

