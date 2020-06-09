export const eventValueMap = {
    input: (e) => e,
    blur: (e) => e.target.value,
    focus: (e) => e.target.value,
    mouseenter: (e) => e.target.value,
    mouseleave: (e) => e.target.value
};

export const addEventListenerBinding = (element, event, handler) => {
    if (element && event && handler) {
        element.addEventListener(event, handler, false);
    }
}

export const attachEventBinding = (element, event, handler) => {
    if (element && event && handler) {
        element.attachEvent('on' + event, handler);
    }
}


export const removeEventListenerBinding = (element, event, handler) => {
    if (element && event) {
        element.removeEventListener(event, handler, false);
    }
}

export const detachEventBinding = (element, event, handler) => {
    if (element && event) {
        element.detachEvent('on' + event, handler);
    }
}