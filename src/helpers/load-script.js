import {isScriptLoaded} from "./validate.js";

export const loadExternalScript = (src, id = null) => {
    return new Promise((resolve, reject) => {
        let async_load = function () {
            if (!isScriptLoaded(src)) {
                let first, s;
                s = document.createElement('script');
                s.src = src;
                s.id = id;
                s.type = 'text/javascript';
                s.async = true;
                s.defer = true;
                s.onload = () => {
                    resolve()
                };
                s.onerror = () => {
                    reject()
                };
                first = document.getElementsByTagName('script')[0];
                return first.parentNode.insertBefore(s, first);
            }
        };

        if (window.attachEvent != null) {
            window.attachEvent('onload', async_load);
        } else {
            window.addEventListener('load', async_load, false);
        }
    });
}

export const loadScript = (src) => { // eslint-disable-line no-param-reassign
    return new Promise(function (resolve, reject) {
        if (document.querySelector('script[src="' + src + '"]')) {
            resolve();

            return;
        }

        const el = document.createElement('script');

        el.type = 'text/javascript';
        el.async = true;
        el.src = src;

        el.addEventListener('load', resolve);
        el.addEventListener('error', reject);
        el.addEventListener('abort', reject);

        document.head.appendChild(el);
    });
}

export const unloadScript = (src) => { // eslint-disable-line no-param-reassign
    return new Promise(function (resolve, reject) {
        const el = document.querySelector('script[src="' + src + '"]');

        if (!el) {
            reject();

            return;
        }

        document.head.removeChild(el);

        resolve();
    });
}