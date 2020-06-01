import { isValidColor } from '../helpers';
import { computed, ref } from '@vue/composition-api';

let colors = {

};

export function useColor(colorValue) {
    if(!isValidColor(colorValue)) return;

    const color = ref(colorValue);

    const hasColor = computed(() => color !== null);

    return { hasColor, color }
}

