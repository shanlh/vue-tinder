module.exports = {
  root: true,
  parser: "babel-eslint",
  extends: "standard",
  rules: {
    "prefer-promise-reject-errors": 0
  },
  plugins: [
    'html'
  ],
  globals: {
    Vue: true
  }
}