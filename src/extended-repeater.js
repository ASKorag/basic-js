module.exports = repeater = (str, options) => {
  const {
    repeatTimes = 1,
    separator = '+',
    addition = '',
    additionRepeatTimes = 1,
    additionSeparator = '|',
  } = options

  let additionArray = []

  for (let i = 0; i < additionRepeatTimes; i++) {
    additionArray.push(
      String(addition),
      i === additionRepeatTimes - 1 ? '' : additionSeparator
    )
  }

  let additionString = additionArray.join('')

  let result = []

  for (let i = 0; i < repeatTimes; i++) {
    result.push(
      String(str),
      additionString,
      i === repeatTimes - 1 ? '' : separator
    )
  }

  return result.join('')
}
