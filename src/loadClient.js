const { dirname } = require('path')
const fs = require('fs').promises

const getFile = async path => {
  let data = await fs.readFile(path, 'utf8')
  //console.log({data})
  return data
}

async function loadClient() {
  // TODO make more generic regex (or ideally remove the need for it)
  // NOTE: https://regex101.com/
  // TODO make it work for local (not installed as node_module) for testing

  const appDir = dirname(require.main.filename)
  const srcDir = `${appDir}/node_modules/micro-js-html/src`

  let rawElementsScript = (await getFile(`${srcDir}/elements.js`))
    .replace(/const.+?Element.+?\=.+?require\(\'\.\/Element\.js\'\)/ig,'const Element = micro.Element')
  let rawHtmlScript = (await getFile(`${srcDir}/html.js`))
    .replace(/const.+?elements.+?\=.+?require\(\'\.\/elements\.js\'\)/ig,'')

  return [
    await getFile(`${srcDir}/client-init.js`),
    await getFile(`${srcDir}/Element.js`),
    rawElementsScript,
    rawHtmlScript,
    await getFile(`${srcDir}/utils.js`),
    await getFile(`${srcDir}/client-utils.js`)
  ].join('\n')
}

module.exports = loadClient
