'use strict';

export const rgbToHex = (red, green, blue, alpha = 1) => {
    const isPercent = (red + (alpha || '')).toString().includes('%');

    if (typeof red === 'string') {
        [red, green, blue, alpha] = red.match(/(0?\.?\d{1,3})%?\b/g).map(Number);
    } else if (alpha !== undefined) {
        alpha = parseFloat(alpha);
    }

    if (typeof red !== 'number' ||
        typeof green !== 'number' ||
        typeof blue !== 'number' ||
        red > 255 ||
        green > 255 ||
        blue > 255
    ) {
        throw new TypeError('Expected three numbers below 256');
    }

    if (typeof alpha === 'number') {
        if (!isPercent && alpha >= 0 && alpha <= 1) {
            alpha = Math.round(255 * alpha);
        } else if (isPercent && alpha >= 0 && alpha <= 100) {
            alpha = Math.round(255 * alpha / 100);
        } else {
            throw new TypeError(`Expected alpha value (${alpha}) as a fraction or percentage`);
        }

        alpha = (alpha | 1 << 8).toString(16).slice(1);
    } else {
        alpha = '';
    }

    return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1) + alpha;
};

export const hexToRgb = (hex, format = 'array') => {

    const hexCharacters = 'a-f\\d';
    const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
    const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
    const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');
    const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');

    if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
        throw new TypeError('Expected a valid hex string');
    }

    hex = hex.replace(/^#/, '');
    let alpha = 1;

    if (hex.length === 8) {
        alpha = parseInt(hex.slice(6, 8), 16) / 255;
        hex = hex.slice(0, 6);
    }

    if (hex.length === 4) {
        alpha = parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
        hex = hex.slice(0, 3);
    }

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    const num = parseInt(hex, 16);
    const red = num >> 16;
    const green = (num >> 8) & 255;
    const blue = num & 255;

    return format === 'array' ?
        [red, green, blue, alpha] :
        {red, green, blue, alpha};
};

export const rgbToHsl = (r, g, b) => {
    var d, h, l, max, min, s;
    r /= 255;
    g /= 255;
    b /= 255;
    max = Math.max(r, g, b);
    min = Math.min(r, g, b);
    h = 0;
    s = 0;
    l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
        }
        h /= 6;
    }
    h = h * 360;
    s = (s * 100) + "%";
    l = (l * 100) + "%";
    return [h, s, l];
};

export const hexToHsl = (hex, format= 'array') => {

    var rgb = hexToRgb(hex)
    
    var hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);

    hsl = [Math.round(hsl[0]), parseInt(hsl[1], 10), parseInt(hsl[2], 10)];

    return format === 'array' ?
        hsl :
        {hue: hsl[0], saturation: hsl[1], lightness: hsl[2] }; //, alpha: hsl[3]};;
}