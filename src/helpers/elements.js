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
