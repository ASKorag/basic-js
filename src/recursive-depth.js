module.exports = class DepthCalculator {
  constructor() {
    this.depth = 0
    this.calculateDepth = this.calculateDepth.bind(this)
  }
  calculateDepth(array) {
    this.depth++

    if (array.every(item => !Array.isArray(item))) {
      //for [1,2,3] and []
      let a = this.depth
      this.depth = 0
      return a
    }
    if (array.some(item => Array.isArray(item)) && array.length === 1) {
      //for [[]]
      this.calculateDepth(array[0])
    }

    if (array.some(item => Array.isArray(item)) && array.length !== 1) {
      for (let item of array) {
        if (Array.isArray(item)) {
          this.calculateDepth(item)
        }
      }
    }
  }
}

/*
Ваша задача — реализовать класс `DepthCalculator` с методом `calculateDepth`, который принимает массив и возвращает его **глубину**.

Метод `calculateDepth` должен проходить полученный массив **рекурсивно**. Глубина **плоского** массива — 1. Метод должен корректно работать с массивами, не содержащими элементов или содержащими пустые массивы.

Например:

`const depthCalc = new DepthCalculator();`

`depthCalc.calculateDepth([1, 2, 3, 4, 5])` => `1`

`depthCalc.calculateDepth([1, 2, 3, [4, 5]])` => `2`

`depthCalc.calculateDepth([[[]]])` => `3`
*/
