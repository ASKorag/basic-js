module.exports = transform = array => {
  if (!Array.isArray(array)) {
    throw Error
  }

  const escapeSequences = [
    '--discard-next',
    '--discard-prev',
    '--double-next',
    '--double-prev',
  ]

  const doubleRegExp = /--double-(prev|next)/g
  const discardRegExp = /--discard-(prev|next)/g
  const prevRegExp = /--(double|discard)-prev/g
  const nextRegExp = /--(double|discard)-next/g

  let newArray = []

  if (array.length === 0) {
    return []
  }

  newArray = array.map((item, index) => {
    const prevItem = array[index - 1]
    const nextItem = array[index + 1]

    if (nextRegExp.test(prevItem) || prevRegExp.test(nextItem)) {
      // let doubleArray = String(prevItem + nextItem).match(doubleRegExp) || []
      // let doubleCount = doubleArray.length
      let amount = 1
      if (/--double-next/.test(prevItem)) {
        amount++
      }
      if (/--discard-next/.test(prevItem)) {
        return undefined
      }
      if (/--double-prev/.test(nextItem)) {
        amount++
      }

      if (/--discard-prev/.test(nextItem)) {
        amount--
      }

      return {
        value: item,
        //discard: discardRegExp.test(prevItem) || discardRegExp.test(nextItem),
        amount: amount,
      }
    }
    return item
  })

  let na = newArray.filter(item => {
    if (escapeSequences.includes(item)) {
      return false
    }
    if (typeof item === 'object' && item.amount < 1) {
      return false
    }
    if (item === undefined) {
      return false
    }
    return true
  })

  let ab = []

  for (let item of na) {
    if (typeof item === 'object') {
      let c = Array(item.amount)
      c.fill(item.value)
      ab.push(...c)
    } else {
      ab.push(item)
    }
  }

  return ab
}
