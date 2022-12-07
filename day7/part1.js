const fs = require('fs')

const input = fs
    .readFileSync('./input')
    .toString()
    .split('\n')

const test = fs
    .readFileSync('./test')
    .toString()
    .split('\n')

const solve = (input) => {
    const getNestedObject = (obj = {}, path = []) => path.reduce((acc, cur) => acc[cur], obj)

    const buildStructure = (lines, structure = {}, path = []) => {
        if (lines.length === 0) {
            return structure
        }
        const [line, ...rest] = lines
        if (line === '$ cd /' || line === '$ ls') {
            return buildStructure(rest, structure, path)
        }
        if (line.includes('dir ')) {
            const folder = getNestedObject(structure, path)
            const dirname = line.split(' ')[1]
            folder[dirname] = {}
            return buildStructure(rest, structure, path)
        }
        if (line === '$ cd ..') {
            path.pop()
            return buildStructure(rest, structure, path)
        }
        if (line.includes('$ cd ')) {
            const dirname = line.split(' ')[2]
            path.push(dirname)
            return buildStructure(rest, structure, path)
        }
        const folder = getNestedObject(structure, path)
        const [size, filename] = line.split(' ')
        folder[filename] = parseInt(size)
        return buildStructure(rest, structure, path)
    }

    const getFoldersSize = (structure = {}, sum = 0, sizes = []) => {
        const entries = Object.entries(structure)
        const index = entries.findIndex(el => typeof el[1] === 'object')
        if (index === -1) {
            const folderSize = entries.reduce((acc, cur) => acc + cur[1], 0)
            sizes.push(folderSize)
            return {
                sum: sum + folderSize,
                sizes
            }
        }
        const [key, value] = entries[index]
        const size = getFoldersSize(value, 0, sizes)
        structure[key] = size.sum
        return getFoldersSize(structure, sum, sizes)
    }

    const { sizes } = getFoldersSize(buildStructure(input))

    const used = sizes.pop()
    const free = 70000000 - used
    const notEnough = 30000000 - free

    return {
        part1: sizes.filter(el => el <= 100000).reduce((acc, cur) => acc + cur),
        part2: sizes.filter(el => el >= notEnough).sort((a, b) => a - b)[0],  
    }
}

console.log(solve(input))