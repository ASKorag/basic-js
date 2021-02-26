module.exports = transform = (array) => {
  if (!Array.isArray(array)) {
    throw new Error()
  }

  const controlSeqRegExp = /--(discard|double)-(prev|next)/
  const prevRegExp = /--(discard|double)-prev/
  const nextRegExp = /--(discard|double)-next/

  let changedArray = array.map((item, index) => {
    const prevItem = array[index - 1]
    const nextItem = array[index + 1]

    //returned unchanged element
    if (
      ((!controlSeqRegExp.test(prevItem) || prevRegExp.test(prevItem)) &&
        (!controlSeqRegExp.test(nextItem) || nextRegExp.test(nextItem))) ||
      (prevItem === '--double-next' && nextItem === '--discard-prev')
    ) {
      return item
    }

    //returned deleted element
    if (
      prevItem === '--discard-next' ||
      ((!controlSeqRegExp.test(prevItem) || prevRegExp.test(prevItem)) &&
        nextItem === '--discard-prev')
    ) {
      return {
        value: item,
        discard: true,
      }
    }

    //returned doubled element
    if (
      ((!controlSeqRegExp.test(prevItem) || prevRegExp.test(prevItem)) &&
        nextItem === '--double-prev') ||
      (prevItem === '--double-next' &&
        (!controlSeqRegExp.test(nextItem) || nextRegExp.test(nextItem)))
    ) {
      return {
        value: item,
        amount: 2,
      }
    }

    //returned tripled element
    if (prevItem === '--double-next' && nextItem === '--double-prev') {
      return {
        value: item,
        amount: 3,
      }
    }
  })

  const transformedArray = []

  for (let item of changedArray) {
    if (typeof item === 'object' && item.hasOwnProperty('value')) {
      if (item.amount !== undefined) {
        transformedArray.push(...Array(item.amount).fill(item.value))
      }
    } else {
      if (!controlSeqRegExp.test(item)) {
        transformedArray.push(item)
      }
    }
  }

  return transformedArray
}
