class Component {
  constructor(...args) {
    if (typeof args[0] === 'object' && !(args[0] instanceof Component)) {
      this.attributes = args[0]
      args = args.slice(1)
    }
    this.children = args
  }

  renderAttributes() {
    let attributes = ''
    for (let attrName in this.attributes) {
      let attrVal = this.attributes[attrName]
      attributes += ` ${attrName}="${attrVal}"`
    }
    return attributes
  }

  render() {
    let result = `<${this.tag}${this.renderAttributes()}>${
      this.children.map(elem => elem && elem.toString() || '').join('')
    }</${this.tag}>`
    //console.log({result})
    return result
  }

  toString() {
    return this.render()
  }
}

const htmlComponents = [
  class Html extends Component { tag = 'html' },
  class Head extends Component { tag = 'head' },
  
  class Title extends Component { tag = 'title' },
  class Meta extends Component { tag = 'meta' },
  class Link extends Component { tag = 'link' },
  class Script extends Component { tag = 'script' },
  
  class Body extends Component { tag = 'body' },
  class Div extends Component { tag = 'div' },
  class Paragraph extends Component { tag = 'p' },
  
  class Heading1 extends Component { tag = 'h1' },
  class Heading2 extends Component { tag = 'h2' },
  class Heading3 extends Component { tag = 'h3' },
  class Heading4 extends Component { tag = 'h4' },
  class Heading5 extends Component { tag = 'h5' },
  class Heading6 extends Component { tag = 'h6' },
  
  class UnorderedList extends Component { tag = 'ul' },
  class OrderedList extends Component { tag = 'ol' },
  class ListItem extends Component { tag = 'li' },
  
  class Anchor extends Component { tag = 'a' },
  class Image extends Component { tag = 'img' },
  
  class Table extends Component { tag = 'table' },
  class TableHeader extends Component { tag = 'th' },
  class TableRow extends Component { tag = 'tr' },
  class TableDataCell extends Component { tag = 'td' },

  class Form extends Component { tag = 'form' },
  class Label extends Component { tag = 'label' },
  class Input extends Component { tag = 'input' },
  class Option extends Component { tag = 'option' },
]

const htmlShortNames = {}
htmlComponents.forEach(component => {
  const shortFn = (...args) => new component(...args)
  const tag = new component().tag // TODO this is gross but only happens once I guess
  htmlShortNames[tag] = shortFn
})

module.exports = {
  Component,
  ...htmlComponents,
  ...htmlShortNames
}

/*
Html(Body(
  Div({class: 'test'},
    P('this is a test paraghraph'),
    A({href: 'google.com'}, 'go to google')
  )
))
*/