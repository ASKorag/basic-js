const chainMaker = {
  _chainArr: [],
  getLength() {
    return Math.floor((this._chainArr.length + 1) / 2)
  },
  addLink(value = '') {
    if (this.getLength() === 0) {
      this._chainArr.push(`( ${value} )`)
    } else {
      this._chainArr.push('~~', `( ${value} )`)
    }

    return this
  },
  removeLink(position) {
    if (
      !Number.isInteger(position) ||
      position < 0 ||
      position > this.getLength()
    ) {
      this._chainArr = []
      throw new Error()
    }

    if (position === 1) {
      this._chainArr.splice(0, 2)
    } else {
      const positionInArr = 2 * (position - 1)
      this._chainArr.splice(positionInArr - 1, 2)
    }

    return this
  },
  reverseChain() {
    this._chainArr.reverse()
    return this
  },
  finishChain() {
    const returnChain = this._chainArr.join('')
    this._chainArr = []
    return returnChain
  },
}

module.exports = chainMaker
