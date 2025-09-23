// elements.js
{ // arbitrary scope to avoid global variables on client
    
  const Element = require('./Element.js')

  const htmlElements = [
    // Essential elements
    class DocType extends Element { tag = '!DOCTYPE html'; isVoid = true },
    class Html extends Element { tag = 'html' },
    class Head extends Element { tag = 'head' },
    
    // Document metadata
    class Title extends Element { tag = 'title' },
    class Meta extends Element { tag = 'meta'; isVoid = true },
    class Link extends Element { tag = 'link'; isVoid = true },
    class Base extends Element { tag = 'base'; isVoid = true },
    class Style extends Element { tag = 'style' },
    
    // Scripts and embedded content
    class Script extends Element { tag = 'script' },
    class NoScript extends Element { tag = 'noscript' },
    class IFrame extends Element { tag = 'iframe' },
    class Canvas extends Element { tag = 'canvas' },
    class EmbeddedContent extends Element { tag = 'embed'; isVoid = true },
    class ObjectElement extends Element { tag = 'object' },
    class Parameter extends Element { tag = 'param'; isVoid = true },
    
    class Body extends Element { tag = 'body' },
    
    // Semantic structure elements
    class Main extends Element { tag = 'main' },
    class Header extends Element { tag = 'header' },
    class Footer extends Element { tag = 'footer' },
    class Section extends Element { tag = 'section' },
    class Article extends Element { tag = 'article' },
    class Aside extends Element { tag = 'aside' },
    class Navigation extends Element { tag = 'nav' },
    
    // Generic containers
    class Div extends Element { tag = 'div' },
    class Span extends Element { tag = 'span' },
    
    // Text content
    class Paragraph extends Element { tag = 'p' },
    class BlockQuote extends Element { tag = 'blockquote' },
    class PreformattedText extends Element { tag = 'pre' },
    class Address extends Element { tag = 'address' },

    // Line breaks and rules
    class HorizontalRule extends Element { tag = 'hr'; isVoid = true },
    class LineBreak extends Element { tag = 'br'; isVoid = true },
    class WordBreakOpportunity extends Element { tag = 'wbr'; isVoid = true },
    
    // Text formatting
    class Strong extends Element { tag = 'strong' },
    class Bold extends Element { tag = 'b' },
    class Emphasis extends Element { tag = 'em' },
    class Italic extends Element { tag = 'i' },
    class Underline extends Element { tag = 'u' },
    class StrikeThrough extends Element { tag = 's' },
    class Mark extends Element { tag = 'mark' },
    class Small extends Element { tag = 'small' },
    class DeletedText extends Element { tag = 'del' },
    class InsertedText extends Element { tag = 'ins' },
    class Subscript extends Element { tag = 'sub' },
    class Superscript extends Element { tag = 'sup' },
    
    // Semantic inline elements
    class Abbreviation extends Element { tag = 'abbr' },
    class Citation extends Element { tag = 'cite' },
    class Code extends Element { tag = 'code' },
    class KeyboardInput extends Element { tag = 'kbd' },
    class SampleOutput extends Element { tag = 'samp' },
    class Variable extends Element { tag = 'var' },
    class Time extends Element { tag = 'time' },
    class Data extends Element { tag = 'data' },
    class Quote extends Element { tag = 'q' },
    
    class Heading1 extends Element { tag = 'h1' },
    class Heading2 extends Element { tag = 'h2' },
    class Heading3 extends Element { tag = 'h3' },
    class Heading4 extends Element { tag = 'h4' },
    class Heading5 extends Element { tag = 'h5' },
    class Heading6 extends Element { tag = 'h6' },
    
    // Lists
    class UnorderedList extends Element { tag = 'ul' },
    class OrderedList extends Element { tag = 'ol' },
    class ListItem extends Element { tag = 'li' },
    class DescriptionList extends Element { tag = 'dl' },
    class DescriptionTerm extends Element { tag = 'dt' },
    class DescriptionDetails extends Element { tag = 'dd' },
    
    // Links and media
    class Anchor extends Element { tag = 'a' },
    class Image extends Element { tag = 'img'; isVoid = true },
    class Picture extends Element { tag = 'picture' },
    class Audio extends Element { tag = 'audio' },
    class Video extends Element { tag = 'video' },
    class MediaSource extends Element { tag = 'source'; isVoid = true },
    class MediaTrack extends Element { tag = 'track'; isVoid = true },
    class ImageMap extends Element { tag = 'map' },
    class ImageMapArea extends Element { tag = 'area'; isVoid = true },
    
    // Figure elements
    class Figure extends Element { tag = 'figure' },
    class FigureCaption extends Element { tag = 'figcaption' },
    
    // Tables
    class Table extends Element { tag = 'table' },
    class TableHead extends Element { tag = 'thead' },
    class TableBody extends Element { tag = 'tbody' },
    class TableFoot extends Element { tag = 'tfoot' },
    class TableRow extends Element { tag = 'tr' },
    class TableHeaderCell extends Element { tag = 'th' },
    class TableDataCell extends Element { tag = 'td' },
    class TableCaption extends Element { tag = 'caption' },
    class TableColumnGroup extends Element { tag = 'colgroup' },
    class TableColumn extends Element { tag = 'col'; isVoid = true },

    // Forms
    class Form extends Element { tag = 'form' },
    class FieldSet extends Element { tag = 'fieldset' },
    class Legend extends Element { tag = 'legend' },
    class Label extends Element { tag = 'label' },
    class Input extends Element { tag = 'input'; isVoid = true },
    class TextArea extends Element { tag = 'textarea' },
    class Button extends Element { tag = 'button' },
    class Select extends Element { tag = 'select' },
    class OptGroup extends Element { tag = 'optgroup' },
    class Option extends Element { tag = 'option' },
    class DataList extends Element { tag = 'datalist' },
    class Output extends Element { tag = 'output' },
    class Progress extends Element { tag = 'progress' },
    class Meter extends Element { tag = 'meter' },
    
    // Interactive elements
    class Details extends Element { tag = 'details' },
    class Summary extends Element { tag = 'summary' },
    class Dialog extends Element { tag = 'dialog' },
  ]

  const elements = {}
  htmlElements.forEach(elem => elements[elem.name] = elem)

  if (typeof micro !== 'undefined') micro.elements = elements
  else module.exports = elements
}