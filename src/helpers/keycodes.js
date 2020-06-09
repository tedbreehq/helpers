const keys = {
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34
}

// KeyboardEvent.keyCode aliases
export const keyCodes = Object.freeze(keys);

/**
 * Verify if the given event is mapped to a specific key
 *
 * @param key
 * @param e
 * @returns {boolean}
 */
export const isKeyPressed = (key, e) => keys[key] === e.keyCode;