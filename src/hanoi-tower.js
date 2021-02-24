module.exports = calculateHanoi = (disksNumber, turnsSpeed) => {
  const minimalNumberOfMoves = 2 ** disksNumber - 1
  const turnsSpeedPerSecond = turnsSpeed / 3600

  return {
    turns: minimalNumberOfMoves,
    seconds: Math.floor(minimalNumberOfMoves / turnsSpeedPerSecond),
  }
}
