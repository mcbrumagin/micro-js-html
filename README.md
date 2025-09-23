# micro-js-html

It's *actually* just javascript

## General Notes
- basic html as js library to be used on client or server
- compatible with node 12+
- lightweight (no advanced features as seen in react or angular)
- intended to play nice with micro-js (microservice api framework)
- the base load time, from local (micro-js) server to first client dom render, is <50ms
- see tests for examples
- planned support for micro-js callService integration and context injection
- planned support for micro-js logger; log/meter from client to server for extra visibility
- need lots of other tag support (in active development)

## Basic Usage
```javascript:
// server-side
function getRequestHandler(req, res) {
  let htmlContent = html(body(
    div({class: 'test' },
      p('this is a test paragraph'),
      a({ href: 'https://google.com' }, 'go to google')
    )
  )).render()

  res.writeHead(200, { ['content-type']: 'text/html' })
  res.end(htmlContent)
}

// client-side
async function main() {
  (await waitForElement('body')).innerHTML = div({ class: 'test' },
    p('this is a test paragraph'),
    a({ href: 'https://google.com' }, 'go to google')
  ).render()
}
main().then(() => console.log('ready!'))
```
