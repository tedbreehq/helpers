import { isArray } from '../helpers/validate.js';
import { ref, computed } from "@vue/composition-api";


export const useInputError = () => {

    const error = ref(null);


    const hasError = computed(() => {
        if (isArray(error)) {
            return error.length > 0;
        }

        return error !== null;
    });


    const getError = computed(() => {
        if (isArray(error)) {
            return error[0];
        }

        return error;
    });

    return  { error, hasError, getError };
}
