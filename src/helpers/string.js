export function createSlug(str) {
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

export const upperFirst = (str) => (str.charAt(0).toUpperCase() + str.slice(1));

export const kebabCase = (str) => (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()

export const camelize = (str) => str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');

export const randomStr = () => (Math.floor(Math.random() * 100000) * Date.now()).toString(16);
