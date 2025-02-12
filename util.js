/**
 * Picks a random element from an array.
 * @param {Array} array - The array to pick from.
 * @returns {*} - A random element from the array.
 */
function pickRandom(array) {
    if (!Array.isArray(array) || array.length === 0) {
        throw new Error("The input must be a non-empty array.");
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}