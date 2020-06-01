import { computed, ref, isRef } from '@vue/composition-api';

/**
 *
 * @param {Object} options
 * @param {ref|number} options.pageSize
 * @param {ref|number} options.currentIndex 0 based index
 * @param {ref|array} options.array
 */
export const usePaginator = options => {
    // setup props
    const pageSize = isRef(options.pageSize) ? options.pageSize : ref(options.pageSize);

    const currentIndex = isRef(options.currentIndex) ? options.currentIndex : ref(options.currentIndex);

    const array = isRef(options.array) ? options.array : ref(options.array);

    // create computed
    const total = computed(() => array.value.length);

    const currentPageNum = computed(() => currentIndex.value + 1);

    const numPages = computed(() => Math.ceil(total.value / pageSize.value));

    const range = computed(() =>
        array.value.slice(
            currentIndex.value * pageSize.value,
            (currentIndex.value + 1) * pageSize.value
        )
    );

    // create methods
    const gotoNext = () => {
        currentIndex.value = Math.min(currentIndex.value + 1, numPages.value - 1);
    };

    const gotoPrev = () => {
        currentIndex.value = Math.max(0, currentIndex.value - 1);
    };

    const gotoFirst = () => {
        currentIndex.value = 0;
    };

    const gotoLast = () => {
        currentIndex.value = numPages.value - 1;
    };

    // return props, computed, and method variables
    return {
        array,
        pageSize,
        currentIndex,
        currentPageNum,
        total,
        numPages,
        range,
        gotoNext,
        gotoPrev,
        gotoFirst,
        gotoLast
    };
};
