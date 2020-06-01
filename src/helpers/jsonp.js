import { flatten, formatParams } from './functions';

import {randomStr} from "./string";

/**
 * JSONP function.
 * @param { String } url Target URL address.
 * @param { Object } params Querying params object.
 * @param { Number } timeout Timeout setting (ms).
 *
 * @example
 *   Vue.jsonp('/url', {
 *     callbackQuery: ''
 *     callbackName: '',
 *     name: 'LancerComet',
 *     age: 26
 *   }, 1000)
 */
export function jsonp(url, params, timeout) {
    params = params || {};
    timeout = timeout || _timeout;

    return new Promise(function (resolve, reject) {
        if (typeof url !== 'string') {
            throw new Error('[Vue.jsonp] Type of param "url" is not string.')
        }

        let callbackQuery = params.callbackQuery || 'callback';
        let callbackName = params.callbackName || 'jsonp_' + randomStr();

        params[callbackQuery] = callbackName;

        // Remove callbackQuery and callbackName.
        delete params.callbackQuery;
        delete params.callbackName;

        // Convert params to querying str.
        let queryStrs = [];
        Object.keys(params).forEach(function (queryName) {
            queryStrs = queryStrs.concat(formatParams(queryName, params[queryName]))
        });

        let queryStr = flatten(queryStrs).join('&');

        // Timeout timer.
        let timeoutTimer = null;

        // Setup timeout.
        if (typeof timeout === 'number') {
            timeoutTimer = setTimeout(function () {
                removeErrorListener();
                headNode.removeChild(paddingScript);
                delete window[callbackName];
                reject({ statusText: 'Request Timeout', status: 408 })
            }, timeout)
        }

        // Create global function.
        window[callbackName] = function (json) {
            clearTimeout(timeoutTimer);
            removeErrorListener();
            headNode.removeChild(paddingScript);
            resolve(json);
            delete window[callbackName]
        };

        // Create script element.
        let headNode = document.querySelector('head');
        let paddingScript = document.createElement('script');

        // Add error listener.
        paddingScript.addEventListener('error', onError);

        // Append to head element.
        paddingScript.src = url + (/\?/.test(url) ? '&' : '?') + queryStr;
        headNode.appendChild(paddingScript);

        /**
         * Padding script on-error event.
         * @param {Event} event
         */
        function onError(event) {
            removeErrorListener();
            clearTimeout(timeoutTimer);
            reject({
                status: 400,
                statusText: 'Bad Request'
            })
        }

        /**
         * Remove on-error event listener.
         */
        function removeErrorListener() {
            paddingScript.removeEventListener('error', onError)
        }
    })
}
