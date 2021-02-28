module.exports = countCats = (arr) => {
  return (
    arr
      .map((item) => item.join())
      .join()
      .match(/(^|,)\^\^/g) || []
  ).length
}
