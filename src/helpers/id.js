
export const IdGenerator = {
    generateUUID() {
        // as it is funny gen IDs using b - https://gist.github.com/jed/982883
        const b = a =>
            a
                ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
                : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);

        return b();
    },

    generateUUIDWithPrefix(prefix = 'uid') {
        return `${prefix}-${this.generateUUID()}`;
    },



    /**
     * Math.random should be unique because of its seeding algorithm.
     * Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
     *
     * @param baseId
     */

    generateUID() {
        return Math.random().toString(36).substr(2, 9)
    },

    generateUIDWithPrefix (prefix) {
        return `${prefix}-${this.generateUID()}`;
    }
};