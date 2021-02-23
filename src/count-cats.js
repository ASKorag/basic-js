module.exports = countCats = array => {
  return (
    array
      .map(item => item.join())
      .join()
      .match(/(^|,)\^\^/g) || []
  ).length
}
