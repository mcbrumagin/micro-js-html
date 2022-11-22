const {
  html, body, div, p, a,
  form, label, input, option
} = require('../src/index.js')

function testBasicUsage() {
  let component = html(body(
    div({class: 'test'},
      p('this is a test paragraph'),
      a({href: 'google.com'}, 'go to google')
    )
  ))

  let result = component.render()
  let expectedResult = '<html><body><div class="test"><p>this is a test paragraph</p><a href="google.com">go to google</a></div></body></html>'
  if (result !== expectedResult) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expectedResult}"`)
  }
}
/*
*/
function testForm() {
  let component = form(
    label({ for: 'first-name' }),
    input({ type: 'text', id: 'first-name', name: 'first-name' }),
    label({ for: 'last-name' }),
    input({ type: 'text', id: 'last-name', name: 'last-name' })
  )
  // TODO use option

  let result = component.render()
  let expectedResult = `
  <form>
    <label for="fname">First name:</label><br>
    <input type="text" id="fname" name="fname"><br>
    <label for="lname">Last name:</label><br>
    <input type="text" id="lname" name="lname">
  </form>` // TODO something to remove lines and space between ">" and "<"
  if (result !== expectedResult) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expectedResult}"`)
  }
}

let failCounter = 0
async function runTests() {
  const tests = [
    testBasicUsage,
    testForm
  ]

  for (let test of tests) {
    console.log(`Running "${test.name}"`)
    try {
      await test()
      console.log(`Passed! "${test.name}"`)
    } catch (err) {
      failCounter++
      console.log(`Failed "${test.name} with: ${err.stack}`)
    }
  }
}

runTests()
.then(() => {
  if (failCounter > 0) throw new Error('Test suite failed')
  console.log('\nSuccess!') && process.exit(0)
})
.catch(err => console.log(`\nFailed: ${failCounter}`) && process.exit(failCounter))
