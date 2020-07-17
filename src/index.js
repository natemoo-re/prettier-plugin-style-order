const prettier = require('prettier/parser-postcss')
const sorter = require('./config/sorter')
const resolveCwd = require('resolve-cwd');

const { parsers } = prettier;

const languages  = Object.keys(parsers);
const red = str => '\033[31m' + str + '\033[39m'

const requireSyntax = (lang) => {
  let pkg;
  try {
    let path = resolveCwd(`postcss-${lang}`)
    pkg = require(path)
    if (pkg === undefined) throw new Error()
  } catch (e) {
    console.error(
      red(
        `[prettier-plugin-style-order]: Please install "postcss-${lang}" as a dev dependency in order to format .${lang} files`,
      ),
    )
    process.exit(0);
  }
  return pkg;
}

exports.parsers = {}
for (const lang of languages) {
  const parser = parsers[lang];
  exports.parsers[lang] = {
    ...parser,
    preprocess(text, options) {
      if (parser.preprocess) {
        text = parser.preprocess(text, options)
      }
      switch (lang) {
        case 'scss':
          return sorter(text, { syntax: requireSyntax(lang) })
        case 'less':
          return sorter(text, { syntax: requireSyntax(lang) })
        default:
          return sorter(text)
      }
    },
  }
}
