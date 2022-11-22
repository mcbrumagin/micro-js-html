# micro-js-html
## General Notes
- basic html as js library to be used on client or server
- compatible with node 12+
- lightweight (no advanced features as seen in react or angular)
- see tests for examples
- intended to play nice with micro-js (microservice api framework)
- need lots of other tag support (in active development)

## Basic Usage
```javascript:
// server-side
function getRequestHandler(req, res) {
  let htmlContent = html(body(
    div({class: 'test'},
      p('this is a test paragraph'),
      a({href: 'google.com'}, 'go to google')
    )
  )).render()

  res.writeHead(200, { ['content-type']: 'text/html' })
  res.end(htmlContent)
}

// client-side
document.querySelector('body').innerHTML = div({class: 'test'},
  p('this is a test paragraph'),
  a({href: 'google.com'}, 'go to google')
).render()
```