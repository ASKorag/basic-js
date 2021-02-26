const chainMaker = {
  _chainArray: [],
  getLength() {
    return Math.floor((this._chainArray.length + 1) / 2)
  },
  addLink(value = '') {
    if (this.getLength() === 0) {
      this._chainArray.push(`( ${value} )`)
    } else {
      this._chainArray.push('~~', `( ${value} )`)
    }

    return this
  },
  removeLink(position) {
    if (
      !Number.isInteger(position) ||
      position < 0 ||
      position > this.getLength()
    ) {
      this._chainArray = []
      throw new Error()
    }

    if (position === 1) {
      this._chainArray.splice(0, 2)
    } else {
      const positionInArray = 2 * (position - 1)
      this._chainArray.splice(positionInArray - 1, 2)
    }

    return this
  },
  reverseChain() {
    this._chainArray.reverse()
    return this
  },
  finishChain() {
    const returnChain = this._chainArray.join('')
    this._chainArray = []
    return returnChain
  },
}

module.exports = chainMaker
