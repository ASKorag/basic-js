//const CustomError = require('../extensions/custom-error')

module.exports = createDreamTeam = array => {
  return !Array.isArray(array)
    ? false
    : array
        .filter(name => typeof name === 'string')
        .map(name => name.match(/[a-z]/i)[0].toUpperCase())
        .sort()
        .join('')
}
