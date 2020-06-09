import { onMounted, ref } from '@vue/composition-api'
import { useEventListener } from './useEventListener.js'

export function useNetwork () {
    const NT = ['bluetooth', 'cellular', 'ethernet', 'none', 'wifi', 'wimax', 'other', 'unknown'];
    const NET = ['slow-2g', '2g', '3g', '4g', undefined];

    const isOnline = ref(true);
    const saveData = ref(false);
    const offlineAt = ref(undefined);
    const downlink = ref(undefined);
    const downlinkMax = ref(undefined);
    const effectiveType = ref(undefined);
    const type = ref('unknown');

    const navigator = window.navigator;
    const connection = 'connection' in navigator ? (navigator).connection : undefined;

    function updateNetworkInformation () {
        isOnline.value = navigator.onLine
        offlineAt.value = isOnline.value ? undefined : Date.now();

        if (!connection) return;

        downlink.value = connection.downlink;
        downlinkMax.value = connection.downlinkMax;
        effectiveType.value = NET.includes(connection.effectiveType) ? connection.effectiveType : 'unknown';
        saveData.value = connection.saveData;
        type.value = NT.includes(connection.type) ? connection.type : undefined
    }

    onMounted(updateNetworkInformation);

    useEventListener('offline', () => {
        isOnline.value = false;
        offlineAt.value = Date.now();
    });

    useEventListener('online', () => {
        isOnline.value = true;
    });

    if (connection)
        useEventListener('change', updateNetworkInformation, false, connection);

    return {
        type,
        isOnline,
        saveData,
        offlineAt,
        downlink,
        downlinkMax,
        effectiveType,
    }
}