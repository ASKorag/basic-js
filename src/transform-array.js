module.exports = transform = (array) => {
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

    //1.1 - 1.3 - 1.5
    if (
      !escapeSequences.includes(prevItem) &&
      (!escapeSequences.includes(nextItem) || nextRegExp.test(nextItem))
    ) {
      return item
    }

    //3
    if (prevItem === dcn) {
      return {
        value: item,
        discard: true,
        amount: 1,
      }
    }

    //2.1 - 2.3 - 2.5
    if (
      prevItem === dcp &&
      (!escapeSequences.includes(nextItem) || nextRegExp.test(nextItem))
    ) {
      return item
    }

    //4.1 - 4.3 - 4.5
    if (
      prevItem === dbp &&
      (!escapeSequences.includes(nextItem) || nextRegExp.test(nextItem))
    ) {
      return item
    }

    //1.4 - 2.4 - 4.4
    if (
      (!escapeSequences.includes(prevItem) || prevRegExp.test(prevItem)) &&
      nextItem === dbp
    ) {
      return {
        value: item,
        discard: false,
        amount: 2,
      }
    }

    //1.2 - 2.2 - 4.2
    if (
      (!escapeSequences.includes(prevItem) || prevRegExp.test(prevItem)) &&
      nextItem === dcp
    ) {
      return {
        value: item,
        discard: true,
        amount: 1,
      }
    }

    //5.1 - 5.3 - 5.5
    if (
      prevItem === dbn &&
      (!escapeSequences.includes(nextItem) || nextRegExp.test(nextItem))
    ) {
      return {
        value: item,
        discard: false,
        amount: 2,
      }
    }

    //5.2
    if (prevItem === dbn && nextItem === dcp) {
      return item
    }

    //5.4
    if (prevItem === dbn && nextItem === dbp) {
      return {
        value: item,
        discard: false,
        amount: 3,
      }
    }
  })

  const ab = []

  // for (let item of na) {
  //   if (
  //     !escapeSequences.includes(item) ||
  //     (typeof item === 'object' && item.discard === false)
  //   ) {
  //     if (typeof item === 'object' && item.amount === 2) {
  //       ab.push(item.value)
  //       ab.push(item.value)
  //     }

  //     if (typeof item === 'object' && item.amount === 3) {
  //       ab.push(item.value)
  //       ab.push(item.value)
  //       ab.push(item.value)
  //     }

  //     if (typeof item !== 'object') {
  //       ab.push(item)
  //     }
  //   }
  // }

  for (let item of na) {
    if (typeof item === 'object' && item.hasOwnProperty('discard')) {
      if (item.discard === false) {
        if (item.amount === 2) {
          ab.push(item.value)
          ab.push(item.value)
        }
        if (item.amount === 3) {
          ab.push(item.value)
          ab.push(item.value)
          ab.push(item.value)
        }
      }
    } else {
      ab.push(item)
    }
  }

  return ab.filter((item) => !escapeSequences.includes(item))
}
