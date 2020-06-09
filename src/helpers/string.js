export const upperFirst = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

export const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

export const toCamelCase = (str) => str.replace(
    /(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()
).replace(/\s+/g, '');

export const toPascalCase = (str) => upperFirst(toCamelCase(str));

export const toSnakeCase = (str) => {
    return str.replace(/\W+/g, " ")
      .split(/ |\B(?=[A-Z])/)
      .map(word => word.toLowerCase())
      .join('_');
};

export const randomString = () => (Math.floor(Math.random() * 100000) * Date.now()).toString(16);

export const slugify = (str)  => {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaaaeeeeiiiioooouuuunc------";

    let i = 0, l = from.length;
    for (; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes
        .replace(/^-+/, "") // trim - from start of text
        .replace(/-+$/, ""); // trim - from end of text

    return str;
}


export const trim = (str) => (str || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');


/**
 * Return hash for a given string
 *
 * @param str
 * @returns {number}
 */
export function toHashString(str) {
    let hash = 0;

    if (str.length === 0) {
        return hash;
    }

    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32bit integer
    }

    return hash;
}
