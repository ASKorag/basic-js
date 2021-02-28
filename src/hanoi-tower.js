module.exports = calculateHanoi = (disksAmount, turnsSpeed) => {
  const numberOfMoves = 2 ** disksAmount - 1
  const turnsSpeedPerSecond = turnsSpeed / 3600

  return {
    turns: numberOfMoves,
    seconds: Math.floor(numberOfMoves / turnsSpeedPerSecond),
  }
}
