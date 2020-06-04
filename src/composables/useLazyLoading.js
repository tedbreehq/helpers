import LazyLoad from "vanilla-lazyload";
import {onMounted, onUpdated} from '@vue/composition-api';
import {objectMerge} from "../helpers/functions.js";

export function useLazyLoading(elementSelector, options = {}) {
    if (!document.lazyLoadInstance) {
        document.lazyLoadInstance = new LazyLoad( objectMerge({
            elements_selector: elementSelector,
            use_native: true,
        }, options));
    }

    onMounted(() => {
        document.lazyLoadInstance.update();
    });

    onUpdated(() => {
        document.lazyLoadInstance.update();
    });
}
