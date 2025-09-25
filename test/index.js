import { htmlTags} from '../src/index.js'

const {
  html, body, div, p, a, span, h1, h2, h3, br, hr,
  header, footer, main, section, article, aside, nav,
  form, label, input, textarea, button, select, option, fieldset, legend,
  table, thead, tbody, tfoot, tr, th, td, caption,
  ul, ol, li, dl, dt, dd,
  img, audio, video, source, figure, figcaption,
  strong, em, mark, code, abbr, time, small,
  blockquote, pre, address
} = htmlTags

global.micro = { __listeners__: {} }

const removeNewLines = str => str.replace(/\n[\s]+/ig,'')

function testBasicUsage() {
  let Element = html(body(
    div({class: 'test'},
      p('this is a test paragraph'),
      a({href: 'google.com'}, 'go to google')
    )
  ))

  let result = Element.render()
  let expectedResult = '<!DOCTYPE html><html><body><div class="test"><p>this is a test paragraph</p><a href="google.com">go to google</a></div></body></html>'
  if (result !== expectedResult) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expectedResult}"`)
  }
}
/*
*/
function testForm() {
  let Element = form(
    label({ for: 'first-name' }, 'First name:'),
    input({ type: 'text', id: 'first-name', name: 'first-name' }),
    label({ for: 'last-name' }, 'Last name:'),
    input({ type: 'text', id: 'last-name', name: 'last-name' })
  )
  // TODO use option

  let result = Element.render()
  let expectedResult = removeNewLines(`<form>
    <label for="first-name">First name:</label>
    <input type="text" id="first-name" name="first-name">
    <label for="last-name">Last name:</label>
    <input type="text" id="last-name" name="last-name">
  </form>`)
  if (result !== expectedResult) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expectedResult}"`)
  }
}

function testSemanticElements() {
  let Element = html(
    body(
      header(h1('Site Title'), nav(a({href: '#'}, 'Home'))),
      main(
        section(
          h2('Section Title'),
          article(
            h3('Article Title'),
            p('Article content with ', strong('bold'), ' and ', em('italic'), ' text.')
          )
        ),
        aside(p('Sidebar content'))
      ),
      footer(p('© 2024 Test Site'))
    )
  )

  let result = Element.render()
  let expected = removeNewLines(`<!DOCTYPE html>
    <html>
    <body>
      <header>
        <h1>Site Title</h1>
        <nav><a href="#">Home</a></nav>
      </header>
      <main>
        <section>
          <h2>Section Title</h2>
          <article>
            <h3>Article Title</h3>
            <p>Article content with <strong>bold</strong> and <em>italic</em> text.</p>
          </article>
        </section>
        <aside><p>Sidebar content</p></aside>
      </main>
      <footer><p>© 2024 Test Site</p></footer>
    </body>
  </html>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testVoidElements() {
  let Element = div(
    p('Line 1'),
    br(),
    p('Line 2'),
    hr(),
    img({src: 'test.jpg', alt: 'Test image'})
  )

  let result = Element.render()
  let expected = removeNewLines(`<div>
    <p>Line 1</p>
    <br>
    <p>Line 2</p>
    <hr>
    <img src="test.jpg" alt="Test image">
  </div>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testTableElements() {
  let Element = table(
    caption('Test Table'),
    thead(
      tr(
        th('Name'),
        th('Age'),
        th('City')
      )
    ),
    tbody(
      tr(
        td('John'),
        td('25'),
        td('New York')
      ),
      tr(
        td('Jane'),
        td('30'),
        td('Boston')
      )
    ),
    tfoot(
      tr(
        td({colspan: '3'}, 'Total: 2 people')
      )
    )
  )

  let result = Element.render()
  let expected = removeNewLines(`<table>
    <caption>Test Table</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>25</td>
        <td>New York</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>30</td>
        <td>Boston</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3">Total: 2 people</td>
      </tr>
    </tfoot>
  </table>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testListElements() {
  let Element = div(
    ul(
      li('Unordered item 1'),
      li('Unordered item 2')
    ),
    ol(
      li('Ordered item 1'),
      li('Ordered item 2')
    ),
    dl(
      dt('Term 1'),
      dd('Definition 1'),
      dt('Term 2'),
      dd('Definition 2')
    )
  )

  let result = Element.render()
  let expected = removeNewLines(`<div>
    <ul>
      <li>Unordered item 1</li>
      <li>Unordered item 2</li>
    </ul>
    <ol>
      <li>Ordered item 1</li>
      <li>Ordered item 2</li>
    </ol>
    <dl>
      <dt>Term 1</dt>
      <dd>Definition 1</dd>
      <dt>Term 2</dt>
      <dd>Definition 2</dd>
    </dl>
  </div>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testFormElements() {
  let Element = form(
    fieldset(
      legend('Personal Information'),
      label({for: 'name'}, 'Name:'),
      input({type: 'text', id: 'name', name: 'name'}),
      br(),
      label({for: 'bio'}, 'Bio:'),
      textarea({id: 'bio', name: 'bio', rows: '3'}, 'Default bio text'),
      br(),
      label({for: 'country'}, 'Country:'),
      select({id: 'country', name: 'country'},
        option({value: 'us'}, 'United States'),
        option({value: 'ca', selected: true}, 'Canada'),
        option({value: 'uk'}, 'United Kingdom')
      ),
      br(),
      button({type: 'submit'}, 'Submit')
    )
  )

  let result = Element.render()
  let expected = removeNewLines(`<form>
    <fieldset>
      <legend>Personal Information</legend>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name">
      <br>
      <label for="bio">Bio:</label>
      <textarea id="bio" name="bio" rows="3">Default bio text</textarea>
      <br>
      <label for="country">Country:</label>
      <select id="country" name="country">
        <option value="us">United States</option>
        <option value="ca" selected="true">Canada</option>
        <option value="uk">United Kingdom</option>
      </select>
      <br>
      <button type="submit">Submit</button>
    </fieldset>
  </form>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testMediaElements() {
  let Element = div(
    figure(
      img({src: 'image.jpg', alt: 'Test image'}),
      figcaption('Image caption')
    ),
    audio({controls: true},
      source({src: 'audio.mp3', type: 'audio/mpeg'}),
      'Your browser does not support audio.'
    ),
    video({controls: true, width: '320', height: '240'},
      source({src: 'video.mp4', type: 'video/mp4'}),
      'Your browser does not support video.'
    )
  )

  let result = Element.render()
  let expected = removeNewLines(`<div>
    <figure>
      <img src="image.jpg" alt="Test image">
      <figcaption>Image caption</figcaption>
    </figure>
    <audio controls="true">
      <source src="audio.mp3" type="audio/mpeg">
      Your browser does not support audio.
    </audio>
    <video controls="true" width="320" height="240">
      <source src="video.mp4" type="video/mp4">
      Your browser does not support video.
    </video>
  </div>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testTextFormattingElements() {
  let Element = div(
    p('This text has ', mark('highlighted'), ' content.'),
    p('Code example: ', code('console.log("hello")')),
    p('Abbreviation: ', abbr({title: 'HyperText Markup Language'}, 'HTML')),
    p('Published: ', time({datetime: '2024-01-01'}, 'January 1, 2024')),
    p('Small print: ', small('Terms and conditions apply')),
    blockquote('This is a quote from someone important.'),
    pre('Preformatted\n  text with\n    spacing'),
    address('123 Main St, City, State 12345')
  )

  let result = Element.render()
  // Build expected result with proper <pre> formatting (preserves internal newlines)
  let expected = removeNewLines(`<div>
    <p>This text has <mark>highlighted</mark> content.</p>
    <p>Code example: <code>console.log("hello")</code></p>
    <p>Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr></p>
    <p>Published: <time datetime="2024-01-01">January 1, 2024</time></p>
    <p>Small print: <small>Terms and conditions apply</small></p>
    <blockquote>This is a quote from someone important.</blockquote>
  `) + '<pre>Preformatted\n  text with\n    spacing</pre>' + removeNewLines(`
    <address>123 Main St, City, State 12345</address>
  </div>`)
  
  if (result !== expected) {
    throw new Error(`Expected:\n"${result}"\nto equal:\n"${expected}"`)
  }
}

function testEventHandlers() {
  let copyGlobalMicroListeners = Object.assign({}, micro.__listeners__)

  try {
    micro.__listeners__ = {}
    
    let clickCount = 0
    let changeCount = 0
    let submitCount = 0
    let clickHandler = () => clickCount++
    
    let Element = div(
      button({onclick: clickHandler}, 'Click me'),
      form({onsubmit: () => submitCount++},
        input({type: 'text', onchange: () => changeCount++}),
        button({type: 'submit'}, 'Submit')
      )
    )

    let result = Element.render()
    
    // Check that event handlers are rendered as attributes (order may vary)
    if (!result.includes('onclick="micro.__listeners__[1](event)"')) {
      throw new Error('onclick event handler not rendered correctly')
    }
    if (!result.includes('onchange="micro.__listeners__[2](event)"')) {
      throw new Error('onchange event handler not rendered correctly')
    }
    if (!result.includes('onsubmit="micro.__listeners__[3](event)"')) {
      throw new Error('onsubmit event handler not rendered correctly')
    }
    
    micro.__listeners__[1]() // simulate click
    if (clickCount === 0) throw new Error('clickHandler not called correctly')

    micro.__listeners__[2]() // simulate change
    if (changeCount === 0) throw new Error('changeHandler not called correctly')

    micro.__listeners__[3]() // simulate submit
    if (submitCount === 0) throw new Error('submitHandler not called correctly')
    
  } finally {
    micro.__listeners__ = copyGlobalMicroListeners
  }
}

function testComplexNestedStructure() {
  let Element = html(
    body(
      header(
        nav(
          ul(
            li(a({href: '#home'}, 'Home')),
            li(a({href: '#about'}, 'About')),
            li(a({href: '#contact'}, 'Contact'))
          )
        )
      ),
      main(
        section({class: 'hero'},
          h1('Welcome to Our Site'),
          p('This is a ', strong('comprehensive'), ' test of nested elements.')
        ),
        section({class: 'content'},
          article(
            h2('Article Title'),
            p('Article content with various formatting:'),
            ul(
              li('Item with ', em('emphasis')),
              li('Item with ', code('code')),
              li('Item with ', mark('highlighting'))
            ),
            figure(
              img({src: 'chart.png', alt: 'Data chart'}),
              figcaption('Figure 1: Important data visualization')
            )
          )
        )
      ),
      footer(
        address('Contact us at info@example.com'),
        p(small('© 2024 Test Company. All rights reserved.'))
      )
    )
  )

  let result = Element.render()
  
  // Test that it contains expected nested structure
  if (!result.includes('<nav><ul><li><a href="#home">Home</a></li>')) {
    throw new Error('Navigation structure not rendered correctly')
  }
  if (!result.includes('<figure><img src="chart.png" alt="Data chart"><figcaption>')) {
    throw new Error('Figure structure not rendered correctly')
  }
  if (!result.includes('<footer><address>Contact us at info@example.com</address>')) {
    throw new Error('Footer structure not rendered correctly')
  }
}

let failCounter = 0
async function runTests() {
  const tests = [
    testBasicUsage,
    testForm,
    testSemanticElements,
    testVoidElements,
    testTableElements,
    testListElements,
    testFormElements,
    testMediaElements,
    testTextFormattingElements,
    testEventHandlers,
    testComplexNestedStructure
  ]

  for (let test of tests) {
    // console.log(`Running "${test.name}"`)
    try {
      await test()
      console.log(`+ Passed! "${test.name}"`)
    } catch (err) {
      failCounter++
      console.log(`x Failed "${test.name} with: ${err.stack}`)
    }
  }
}

runTests()
.then(() => {
  if (failCounter > 0) throw new Error('Test suite failed')
  console.log('\nSuccess!') && process.exit(0)
})
.catch(err => console.log(`\nFailed: ${failCounter}`) && process.exit(failCounter))
