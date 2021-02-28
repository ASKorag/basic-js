module.exports = class DepthCalculator {
  calculateDepth(arr) {
    if (arr.every((item) => !Array.isArray(item))) {
      return 1
    } else {
      const newArr = []
      arr
        .filter((item) => Array.isArray(item))
        .map((item) => newArr.push(...item))

      return 1 + this.calculateDepth(newArr)
    }
  }
}
