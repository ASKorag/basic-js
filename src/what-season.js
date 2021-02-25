module.exports = getSeason = date => {
  if (date === undefined) {
    return 'Unable to determine the time of year!'
  }

  if (isNaN(new Date(date.getTime()))) {
    throw Error
  }

  const seasons = {
    winter: [11, 0, 1],
    spring: [2, 3, 4],
    summer: [5, 6, 7],
    autumn: [8, 9, 10],
  }

  const month = date.getMonth()

  for (let key in seasons) {
    if (seasons[key].includes(month)) {
      return key
    }
  }
}
