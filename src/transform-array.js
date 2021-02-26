module.exports = transform = array => {
  if (!Array.isArray(array)) {
    throw new Error()
  }

  const escapeSequences = [
    '--discard-next',
    '--discard-prev',
    '--double-next',
    '--double-prev',
  ]

  const dcp = '--discard-prev'
  const dcn = '--discard-next'
  const dbp = '--double-prev'
  const dbn = '--double-next'

  const discardRegExp = /--discard-(prev|next)/
  const doubleRegExp = /--double-(prev|next)/
  const prevRegExp = /--(discard|double)-prev/
  const nextRegExp = /--(discard|double)-next/

  let newArray = [...array]

  // empty array
  if (newArray.length === 0) {
    return newArray
  }

  //simple array
  if (
    !newArray.includes(dcp) &&
    !newArray.includes(dcn) &&
    !newArray.includes(dbp) &&
    !newArray.includes(dbn)
  ) {
    return newArray
  }

  let na = newArray.map((item, index) => {
    const prevItem = newArray[index - 1]

    const nextItem = newArray[index + 1]

    if (prevRegExp.test(prevItem)) {
      return item
    }
    if (nextRegExp.test(nextItem)) {
      return item
    }

    return item
  })

  return na.filter(item => !escapeSequences.includes(item))
}
