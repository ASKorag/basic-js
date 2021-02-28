module.exports = transform = (arr) => {
  if (!Array.isArray(arr)) {
    throw new Error()
  }

  const controlSeqRegExp = /--(discard|double)-(prev|next)/
  const prevRegExp = /--(discard|double)-prev/
  const nextRegExp = /--(discard|double)-next/

  let changedArr = arr.map((item, index) => {
    const prevItem = arr[index - 1]
    const nextItem = arr[index + 1]

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

  const transformedArr = []

  for (let item of changedArr) {
    if (item.amount !== undefined) {
      transformedArr.push(...Array(item.amount).fill(item.value))
    } else {
      if (!controlSeqRegExp.test(item) && item.discard === undefined) {
        transformedArr.push(item)
      }
    }
  }

  return transformedArr
}
