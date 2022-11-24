// html.js
{ // arbitrary scope to avoid global variables on client

  const elements = (typeof micro !== 'undefined')
    ? micro.elements
    : require('./elements.js')

  const html = {}
  for (let elem in elements) {
    const Element = elements[elem]
    const shortFn = (...args) => new Element(...args)
    const tag = new Element().tag // TODO this is gross but only happens once I guess
    html[tag] = shortFn
  }

  if (typeof micro !== 'undefined') micro.html = html
  else module.exports = html
}
