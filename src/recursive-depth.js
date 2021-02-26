module.exports = class DepthCalculator {
  calculateDepth(array) {
    if (array.every(item => !Array.isArray(item))) {
      return 1
    } else {
      const newArray = []
      array
        .filter(item => Array.isArray(item))
        .map(item => newArray.push(...item))

      return 1 + this.calculateDepth(newArray)
    }
  }
}
