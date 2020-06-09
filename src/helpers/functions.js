export const objectMerge = (obj, src) => {
    Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
    return obj;
}

export const convertToUnit = (str, unit = 'px') => {
    if (str == null || str === '') {
        return undefined
    } else if (isNaN(+str)) {
        return String(str)
    } else {
        return `${Number(str)}${unit}`
    }
}

export const arrayDiff = (a, b) => {
    const diff = [];
    for (let i = 0; i < b.length; i++) {
        if (a.indexOf(b[i]) < 0) diff.push(b[i])
    }
    return diff
}

export const formatParams = (queryName, value) => {
    queryName = queryName.replace(/=/g, '');
    let result = [];

    switch (value.constructor) {
        case String:
        case Number:
        case Boolean:
            result.push(encodeURIComponent(queryName) + '=' + encodeURIComponent(value));
            break;

        case Array:
            value.forEach(function (item) {
                result = result.concat(formatParams(queryName + '[]=', item))
            });
            break;

        case Object:
            Object.keys(value).forEach(function (key) {
                let item = value[key];
                result = result.concat(formatParams(queryName + '[' + key + ']', item))
            });
            break
    }

    return result
}

export const flatten = (array) => {
    let queries = [];

    array.forEach(function (item) {
        if (typeof item === 'string') {
            queries.push(item)
        } else {
            queries = queries.concat(flatten(item))
        }
    });

    return queries
}


export const isFocusable = (element) => {
    if (element.tabIndex > 0 || (element.tabIndex === 0 && element.getAttribute('tabIndex') !== null)) {
        return true;
    }

    if (element.disabled) {
        return false;
    }

    switch (element.nodeName) {
    case 'A':
        return !!element.href && element.rel !== 'ignore';
    case 'INPUT':
        return element.type !== 'hidden' && element.type !== 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
        return true;
    default:
        return false;
    }
}

/**
 * Check if given element is visible
 *
 * @param element
 */
export const isVisible = (element) =>  { 
    return Boolean(element) 
    && Boolean(element.offsetWidth 
    || element.offsetHeight 
    || element.getClientRects().length);
}
