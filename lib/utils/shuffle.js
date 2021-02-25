/**
 * 
 * @param {number} min minimum value
 * @param {number} max maximum value
 * @description get a random number
 * @returns {number} random number between min and max.
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min
}

/**
 * 
 * @param {Array} array array with values for shuffle
 * @param {number} [number=1] number of element what you want in returns
 * @param {boolean} [duplicate=false] if a value can be duplicate in return
 * @description give a randow result.
 * @returns {(Array|string|boolean|number|Object)} if number is not define, return a value, not Array.
 */

function shuffle(array, number, duplicate) {
    const newArray = [];

    do {
        const randomIndex = getRandomInt(0, array.length),
            newItem = newArray.find(el => el === array[randomIndex]);
        if (!newItem || (newItem && duplicate)) { newArray.push(arr[randomIndex]) }
    } while (array.length !== newArray.length);

    if (number === 0) { return newArray }
    else if (number <= array.length || duplicate) { return newArray.slice(0, number) }
    else { return newArray[0] }
}


const ALPHABET =
    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

module.exports = { getRandomInt, shuffle, ALPHABET, NUMBERS };