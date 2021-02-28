const MODERN_ACTIVITY = 15
const HALF_LIFE_PERIOD = 5730

module.exports = dateSample = (sampleActivity) => {
  if (
    typeof sampleActivity !== 'string' ||
    isNaN(sampleActivity) === true ||
    sampleActivity <= 0 ||
    sampleActivity > MODERN_ACTIVITY
  ) {
    return false
  }

  const k = Math.LN2 / HALF_LIFE_PERIOD
  return Math.ceil(Math.log(MODERN_ACTIVITY / +sampleActivity) / k)
}
