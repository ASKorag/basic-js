module.exports = createDreamTeam = (arr) => {
  return !Array.isArray(arr)
    ? false
    : arr
        .filter((name) => typeof name === 'string')
        .map((name) => name.match(/[a-z]/i)[0].toUpperCase())
        .sort()
        .join('')
}
