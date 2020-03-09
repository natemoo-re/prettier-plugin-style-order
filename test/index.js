const prettier = require('prettier');

const red = str => '\033[31m' + str + '\033[39m'
const green = str => '\033[32m' + str + '\033[39m';

const tests = {
  css: {
    input: `a {
  width: auto;
  height: auto;
  display: block;
  margin: 10px;
  position: relative;
  color: red;
  padding: 10px;
  border: 1px solid blue;
  background: white;
}
`,
    expected: `a {
  position: relative;
  display: block;
  width: auto;
  height: auto;
  margin: 10px;
  padding: 10px;
  color: red;
  background: white;
  border: 1px solid blue;
}
`,
  },
  scss: {
    input: `a {
  width: auto;
  height: auto;
  display: block;
  margin: 10px;
  position: relative;
  color: red;
  padding: 10px;
  border: 1px solid blue;
  background: white;

  &:hover {
    color: red;
    padding: 10px;
    border: 1px solid blue;
    background: white;
    position: absolute;
  }
}
`,
    expected: `a {
  position: relative;
  display: block;
  width: auto;
  height: auto;
  margin: 10px;
  padding: 10px;
  color: red;
  background: white;
  border: 1px solid blue;

  &:hover {
    position: absolute;
    padding: 10px;
    color: red;
    background: white;
    border: 1px solid blue;
  }
}
`,
  },
}

const color = passed => passed ? green : red;

async function testGroup(ext) {
  const files = ['style', 'foo/bar/style', 'foo\\bar\\styles'];
  console.group(ext)
  files
    .map(n => `${n}.${ext}`)
    .forEach(filepath => {
      const { input, expected } = tests[ext];
      const output = prettier.format(input, {
        filepath,
        plugins: ['.'],
      })
      const passed = output === expected;
      console.log(color(passed)(`${passed ? '✔' : '✖'} ${filepath}`));
      if (!passed) {
        console.log(output, expected);
        process.exitCode = 1
      }
    })
  console.groupEnd()
}

async function run() {
  const exts = Object.keys(tests);
  exts.forEach(ext => testGroup(ext));
}

run();