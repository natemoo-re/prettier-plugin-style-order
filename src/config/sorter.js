const postcss = require('postcss')
const sorting = require('postcss-sorting')
const createConfig = require('./factory')

module.exports = (value, opts = {}) => {
  return postcss([
    sorting(createConfig())
  ]).process(value, { ...opts, from: undefined }).css
}
