// elements.js
{ // arbitrary scope to avoid global variables on client
    
  const Element = require('./Element.js')

  const htmlElements = [
    class Html extends Element { tag = 'html' },
    class Head extends Element { tag = 'head' },
    
    class Title extends Element { tag = 'title' },
    class Meta extends Element { tag = 'meta' },
    class Link extends Element { tag = 'link' },
    class Script extends Element { tag = 'script' },
    
    class Body extends Element { tag = 'body' },
    class Div extends Element { tag = 'div' },
    class Paragraph extends Element { tag = 'p' },
    
    class Heading1 extends Element { tag = 'h1' },
    class Heading2 extends Element { tag = 'h2' },
    class Heading3 extends Element { tag = 'h3' },
    class Heading4 extends Element { tag = 'h4' },
    class Heading5 extends Element { tag = 'h5' },
    class Heading6 extends Element { tag = 'h6' },
    
    class UnorderedList extends Element { tag = 'ul' },
    class OrderedList extends Element { tag = 'ol' },
    class ListItem extends Element { tag = 'li' },
    
    class Navigation extends Element { tag = 'nav' },
    class Anchor extends Element { tag = 'a' },
    class Image extends Element { tag = 'img' },
    
    class Table extends Element { tag = 'table' },
    class TableHeader extends Element { tag = 'th' },
    class TableRow extends Element { tag = 'tr' },
    class TableDataCell extends Element { tag = 'td' },

    class Form extends Element { tag = 'form' },
    class Button extends Element { tag = 'button' },
    class Label extends Element { tag = 'label' },
    class Input extends Element { tag = 'input' },
    class Option extends Element { tag = 'option' },
  ]

  const elements = {}
  htmlElements.forEach(elem => elements[elem.name] = elem)

  if (typeof micro !== 'undefined') micro.elements = elements
  else module.exports = elements
}