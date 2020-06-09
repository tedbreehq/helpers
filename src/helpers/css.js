/**
 * Check whether given element has given className
 *
 * @param element
 * @param className
 * @returns {boolean}
 */
export const hasClass = (element, className) => {
    if (!element || !className) return false;
    if (className.indexOf(' ') !== -1) throw new Error('Class name should not contain spaces.');

    if (element.classList) {
        return element.classList.contains(className);
    } else {
        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
    }
}

/**
 * Add new classes to the given element
 *
 * @param element
 * @param classes
 */
export const addClass = (element, classes) => {
    if (!element) return;

    let currentClass = element.className;
    classes = (classes || '').split(' ');

    for (let i = 0, j = classes.length; i < j; i++) {
        const className = classes[i];
        if (!className) continue;

        if (element.classList) {
            element.classList.add(className);
        } else if (!hasClass(element, className)) {
            currentClass += ' ' + className;
        }
    }

    if (!element.classList) {
        element.className = currentClass;
    }
}

import { trim } from './string.js';

export function removeClass (element, classes) {
    if (!element || !classes) return;

    classes = classes.split(' ');
    let currentClass = ' ' + element.className + ' ';

    for (let i = 0, j = classes.length; i < j; i++) {
        const className = classes[i];
        if (!className) continue;

        if (element.classList) {
            element.classList.remove(className);
        } else if (hasClass(element, className)) {
            currentClass = currentClass.replace(' ' + className + ' ', ' ');
        }
    }

    if (!element.classList) {
        element.className = trim(currentClass);
    }
}