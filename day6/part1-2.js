const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    

const solve = (input, length) => {
    const checkUniqueChars = (subStr) => {
        const substrSet = new Set(subStr.split(''))
        return subStr.length === substrSet.size
    }

    const getSlice = (str, length, counter = length) => {
        const slice = str.slice(0, length)
        if (checkUniqueChars(slice)) {
            return counter
        }
        return getSlice(str.slice(1), length, counter + 1)
    }
      
    return getSlice(input, length)
}

console.log(solve(input, 4))
console.log(solve(input, 14))