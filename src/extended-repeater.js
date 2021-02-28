module.exports = repeater = (str, options) => {
  const {
    repeatTimes = 1,
    separator = '+',
    addition = '',
    additionRepeatTimes = 1,
    additionSeparator = '|',
  } = options

  const additionStr = formStr(addition, additionRepeatTimes, additionSeparator)

  return formStr(str, repeatTimes, separator, additionStr)

  function formStr(str, amount, separator, addition) {
    const arr = []

    for (let i = 0; i < amount; i++) {
      if (addition === undefined) {
        arr.push(String(str), i === amount - 1 ? '' : separator)
      } else {
        arr.push(String(str), addition, i === amount - 1 ? '' : separator)
      }
    }

    return arr.join('')
  }
}
