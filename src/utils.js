/**
 * Escape all HTML entities in given string, i.e. replace all "&", "<" and ">"
 * with their HTML escape sequence.
 *
 * @param {string} str - String to be escaped. Will be stringified if necessary
 *
 * @returns {string} The HTML-escaped string
 *
 * @throws if argument cannot be stringified
 */
function escape(str) {
    if (!str) {
        return undefined;
    }

    if (typeof str !== "string"){
        if (typeof str.toString === "function") {
            str = str.toString();
        } else {
            throw("Cannot stringify argument!");
        }
    }

    return str.replaceAll("&", "&amp;")
              .replaceAll(">", "&gt;")
              .replaceAll("<", "&lt;");
}

export default {
    escape: escape
};
