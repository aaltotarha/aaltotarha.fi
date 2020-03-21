const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  displayName: !isProduction,
}
